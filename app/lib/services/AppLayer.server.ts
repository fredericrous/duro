import { Layer } from "effect"
import { WorkflowEngine } from "@effect/workflow"
import { LldapClientLive } from "./LldapClient.server"
import { VaultPkiLive } from "./VaultPki.server"
import { GitHubClientLive } from "./GitHubClient.server"
import { EmailServiceLive } from "./EmailService.server"
import { InviteRepoLive } from "./InviteRepo.server"
import { EventBrokerLive } from "./EventBroker.server"
import { InviteWorkflowLayer } from "~/lib/workflows/invite.server"

// InviteWorkflowLayer is a side-effect layer (registers workflow with engine).
// provideMerge feeds the services+engine output into InviteWorkflowLayer's
// requirements, and merges their output into the result.
export const AppLayer = InviteWorkflowLayer.pipe(
  Layer.provideMerge(
    Layer.mergeAll(
      LldapClientLive,
      VaultPkiLive,
      GitHubClientLive,
      EmailServiceLive,
      InviteRepoLive,
      EventBrokerLive,
      WorkflowEngine.layerMemory,
    ),
  ),
)
