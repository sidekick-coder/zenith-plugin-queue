import { defineJob } from "#server/utils/defineJob.ts";
import { v } from "@sidekick-coder/zenith-kit/shared";

export default defineJob({
    id: "sample",
    description: "A sample job definition",
    schema: v.object({
        name: v.string(),
    }),
    handle: async (data) => {
        console.log("Handling job with data:", data);
    }
})
