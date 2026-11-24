import QueueService from "#server/services/QueueService.ts";
import { container } from "@sidekick-coder/zenith-kit/server";

const queue = container.proxy<QueueService>(QueueService)

export default queue
