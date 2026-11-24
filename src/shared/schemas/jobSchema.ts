import { validator, ValidatorResult } from "@sidekick-coder/zenith-kit/shared";

export interface JobSchema extends ValidatorResult<ReturnType<typeof jobSchema>> {}

const v = validator.v

export function jobSchema() {
    return v.object({
        id: v.string(),
        status: v.string(),
        queue_id: v.string(),
        data: v.any(),
        result: v.any(),
        error: v.any(),
    })
}
