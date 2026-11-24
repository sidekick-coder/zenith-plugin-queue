import type JobDefinition from "#server/entities/JobDefinition.ts";
import { BaseException } from "@sidekick-coder/zenith-kit/shared";
import BaseAdapter from "./BaseAdapter.ts";
import fastq from "fastq";
import type { queueAsPromised as FastqQueue } from "fastq";
import type { JobSchema } from "#shared/schemas/jobSchema.ts";

export default class MemoryAdapter extends BaseAdapter {
    public entries: Map<JobDefinition["id"], FastqQueue> = new Map()

    public async register(definition: JobDefinition): Promise<void> {
        if (this.entries.has(definition.id)) {
            throw new BaseException(`Job with id "${definition.id}" is already registered`)
        }

        const worker = (payload: any) => definition.handle(payload)

        const q = fastq.promise(worker, 1)

        this.entries.set(definition.id, q)
    }

    public async dispatch(def: JobDefinition, data: JobSchema["data"]): Promise<void> {
        const q = this.entries.get(def.id)

        if (!q) {
            throw new BaseException(`Job with id "${def.id}" is not registered`)
        }

        await q.push(data)
    }

    public listQueues(): Promise<JobDefinition[]> {
        return Promise.resolve(Array.from(this.entries.keys()).map(id => ({ id } as JobDefinition)))
    }

}
