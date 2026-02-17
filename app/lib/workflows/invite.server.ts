import { Effect } from "effect"
import { LldapClient } from "~/lib/services/LldapClient.server"
import { VaultPki } from "~/lib/services/VaultPki.server"
import { GitHubClient } from "~/lib/services/GitHubClient.server"
import { EmailService } from "~/lib/services/EmailService.server"
import { InviteRepo } from "~/lib/services/InviteRepo.server"

export interface InviteInput {
  email: string
  groups: number[]
  groupNames: string[]
  invitedBy: string
}

export interface AcceptInput {
  username: string
  password: string
}

export const sendInvite = (input: InviteInput) =>
  Effect.gen(function* () {
    const inviteRepo = yield* InviteRepo
    const vault = yield* VaultPki
    const github = yield* GitHubClient
    const email = yield* EmailService

    // Step 1: Create invite record
    const invite = yield* inviteRepo.create(input)

    // Step 2: Issue cert + P12 with random password
    const { p12Buffer } = yield* vault.issueCertAndP12(
      input.email,
      invite.id,
    )

    yield* inviteRepo.updateStepState(invite.id, { certIssued: true })

    // Step 3: Create GitHub PR for cert-manager Certificate (non-critical)
    const username = input.email.split("@")[0].replace(/[^a-z0-9_-]/gi, "")
    yield* github.createCertPR(invite.id, input.email, username).pipe(
      Effect.tap(() =>
        inviteRepo.updateStepState(invite.id, { prCreated: true }),
      ),
      Effect.catchAll((e) =>
        Effect.logWarning("GitHub PR creation failed (non-critical)", e),
      ),
    )

    // Step 4: Send email with P12 attachment
    yield* email.sendInviteEmail(
      input.email,
      invite.token,
      input.invitedBy,
      p12Buffer,
    )

    yield* inviteRepo.updateStepState(invite.id, { emailSent: true })

    return { success: true as const, message: `Invite sent to ${input.email}` }
  })

export const acceptInvite = (token: string, input: AcceptInput) =>
  Effect.gen(function* () {
    const inviteRepo = yield* InviteRepo
    const lldap = yield* LldapClient

    // Atomic consume — marks invite as used
    const invite = yield* inviteRepo.consumeByToken(token)

    const groups: number[] = JSON.parse(invite.groups)

    // Create user with compensating rollback on failure
    yield* lldap.createUser({
      id: input.username,
      email: invite.email,
      displayName: input.username,
      firstName: input.username,
      lastName: "",
    })

    // Set password + add to groups, rollback user on failure
    yield* Effect.gen(function* () {
      yield* lldap.setUserPassword(input.username, input.password)
      for (const gid of groups) {
        yield* lldap.addUserToGroup(input.username, gid)
      }
    }).pipe(
      Effect.tapError(() =>
        lldap
          .deleteUser(input.username)
          .pipe(
            Effect.tap(() =>
              Effect.logWarning(
                `Rolled back user ${input.username} after configuration failure`,
              ),
            ),
            Effect.ignore,
          ),
      ),
    )

    yield* inviteRepo.markUsedBy(invite.id, input.username)

    return { success: true as const }
  })
