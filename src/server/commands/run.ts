import queue from "#server/facades/queue.ts";
import { CliCommand } from "@sidekick-coder/zenith-kit/server";

const command = new CliCommand("queue:run")

command
    .description("Run the queue worker")
    .helpGroup("queue")
    .action(async () => {
        await queue.run()
    })


export default command
