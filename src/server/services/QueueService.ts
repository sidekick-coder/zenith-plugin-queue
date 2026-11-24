import { config, logger, emmitter } from '@sidekick-coder/zenith-kit/server'
import type { JobSchema } from '#shared/schemas/jobSchema.ts'
import { BaseException, LoggerService } from '@sidekick-coder/zenith-kit/shared'
import type JobDefinition from '#server/entities/JobDefinition.ts'
import type BaseAdapter from '#server/adapters/BaseAdapter.ts'
import MemoryAdapter from '#server/adapters/MemoryAdapter.ts'

export default class QueueService {
    public static __container_entry_key = 'QueueService'

    public logger: LoggerService
    public debug = false

    public adapter: BaseAdapter
    private loaded = false
    public definitions: Map<string, JobDefinition> = new Map()

    constructor() {
        this.logger = logger.child({ label: 'queue' })
        this.debug = config.getOne(['queue.debug', 'app.debug'], false)

        if (this.debug) {
            this.logger.debug('initialized in debug mode')
        }

        this.adapter = new MemoryAdapter()
    }

    public register(def: JobDefinition) {
        this.definitions.set(def.id, def)
    }

    public async dispatch(def: JobDefinition, data: JobSchema["data"]) {
        if (!this.loaded) {
            throw new BaseException('QueueService is not loaded yet, cannot dispatch jobs')
        }

        return this.adapter.dispatch(def, data)
    }

    public async run() {
        for (const def of this.definitions.values()) {
            await this.adapter.register(def)
        }

        this.loaded = true

        await emmitter.emitAndWait('queue:ready', { queue: this })
    }

    public async listDefinitions() {
        return Array.from(this.definitions.values())
    }
}
