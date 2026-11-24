import type QueueService from "#server/services/QueueService.ts"

declare module "@sidekick-coder/zenith-kit/server" {
    export interface EventContract {
        "queue:registered": {
            queue: QueueService
        }
        "queue:ready": {
            queue: QueueService
        }
    }
}
