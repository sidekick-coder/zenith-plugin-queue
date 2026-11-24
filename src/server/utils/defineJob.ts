import JobDefinition from "#server/entities/JobDefinition.ts";
import type { ValibotObjectSchema } from "@sidekick-coder/zenith-kit/shared";

export function defineJob<T extends ValibotObjectSchema>(
    payload: Omit<JobDefinition<T>, "dispatch">
): JobDefinition<T> {
    const def = new JobDefinition<T>()

    Object.assign(def, payload)

    return def as JobDefinition<T>
}
