import queue from "#server/facades/queue.ts"
import type { ValibotObjectSchema, ValidatorInput } from "@sidekick-coder/zenith-kit/shared"

export default class JobDefinition<T extends ValibotObjectSchema = ValibotObjectSchema> {
    readonly id: string 
    public description?: string
    public schema?: T

    public dispatch(data?: ValidatorInput<T>) {
        return queue.dispatch(this, data)
    }

    public handle(data: ValidatorInput<T>): Promise<any> {
        const error = new Error('Method not implemented')

        Object.assign(error, { data })

        throw error
    }
}
