import queue from "#server/facades/queue.ts";
import { CliCommand } from "@sidekick-coder/zenith-kit/server";

const command = new CliCommand("queue:list-definitions")

command
    .description("List all defintions in the queue")
    .helpGroup("queue")
    .action(async () => {
        const defs = await queue.listDefinitions()

        const items = defs.map(def => ({
            id: def.id,
            description: def.description || "",
        }))

        command.table(items)
    })


export default command
