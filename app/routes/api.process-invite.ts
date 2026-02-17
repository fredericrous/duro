import type { Route } from "./+types/api.process-invite"
import { runEffect } from "~/lib/runtime.server"
import { InviteWorkflow } from "~/lib/workflows/invite.server"

export async function action({ request }: Route.ActionArgs) {
  const event = await request.json()

  if (event.type !== "duro.invite.requested") {
    return new Response("Unknown event type", { status: 400 })
  }

  try {
    await runEffect(InviteWorkflow.execute(event.data))
    return new Response("OK", { status: 200 })
  } catch (e) {
    console.error("Invite workflow failed:", e)
    return new Response("Processing failed", { status: 500 })
  }
}
