import type JobDefinition from "#server/entities/JobDefinition.ts";
import type { JobSchema } from "#shared/schemas/jobSchema.ts";
import { BaseException } from "@sidekick-coder/zenith-kit/shared";

export default class BaseAdapter {
    public async register(definition: JobDefinition): Promise<void> {
        const error = new BaseException('Method not implemented')

        Object.assign(error, { definition })

        throw error
    }

    public async dispatch(definition: JobDefinition, data: JobSchema["data"]): Promise<void> {
        const error = new BaseException('Method not implemented')

        Object.assign(error, { definition, data })

        throw error
    }

    public listQueues(): Promise<JobDefinition[]> {
        const error = new BaseException('Method not implemented')

        throw error
    }
}
