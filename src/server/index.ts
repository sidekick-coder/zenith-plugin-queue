import { container, emmitter } from '@sidekick-coder/zenith-kit/server'
import { definePlugin } from '@sidekick-coder/zenith-kit/shared'
import QueueService from './services/QueueService.ts'
import path from 'path'

export default definePlugin(async () => {
    emmitter.on('plugins:loaded', async () => {
        const queue = new QueueService()

        container.set(QueueService, queue)

        await emmitter.emitAndWait('queue:registered', { queue })

        if (queue.debug) {
            queue.logger.debug('registered')
        }
    })

    // emmitter.on('queue:registered', async ({ queue }) => queue.register(sample))
    //
    // emmitter.on("queue:ready", async () => {
    //     setInterval(() => sample.dispatch({ name: 'Rick' }), 1000)
    // })

    emmitter.on('cli:registered', ({ cli }) => cli.addSource({
        directory: path.resolve(import.meta.dirname, 'commands'),
    }))

    emmitter.on('http:booted', async () => {
        const queue = container.get<QueueService>(QueueService)

        await queue.run()
    })
})

