import { container, emmitter } from '@sidekick-coder/zenith-kit/server'
import { definePlugin } from '@sidekick-coder/zenith-kit/shared'
import QueueService from './services/QueueService.ts'
import sample from './jobs/sample.ts'
import path from 'path'

export default definePlugin(async () => {
    emmitter.on('plugins:loaded', async () => {
        const queue = new QueueService()

        container.set(QueueService, queue)

        await emmitter.emitAndWait('queue:registered', { queue })
    })

    emmitter.on('queue:registered', async ({ queue }) => queue.register(sample))

    emmitter.on("queue:ready", async () => {
        setInterval(() => sample.dispatch({ name: 'Rick' }), 1000)
    })

    // emmitter.on('router:registered', ({ router }) => router.addSource({
    //     id,
    //     prefix: '/api/starter',
    //     directory: path.resolve(import.meta.dirname, 'api'),
    // }))

    emmitter.on('cli:registered', ({ cli }) => cli.addSource({
        directory: path.resolve(import.meta.dirname, 'commands'),
    }))
})

