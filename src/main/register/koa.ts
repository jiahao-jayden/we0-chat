import Koa from 'koa'
import Router from '@koa/router'
import logger from '../../lib/logger'
import { PassThrough } from 'stream'

interface ChatBody {
  message: string
}

// 解析请求体
async function parseBody(ctx: Koa.Context): Promise<ChatBody> {
  return new Promise((resolve, reject) => {
    let data = ''
    ctx.req.on('data', (chunk) => (data += chunk))
    ctx.req.on('end', () => {
      try {
        resolve(JSON.parse(data))
      } catch (err) {
        reject(err)
      }
    })
    ctx.req.on('error', reject)
  })
}

export async function registerKoa() {
  const app = new Koa()
  const router = new Router({
    prefix: '/api'
  })

  logger.info('Koa is running on port 46923')

  // 配置 chat 路由
  router.post('/chat', async (ctx) => {
    const body = await parseBody(ctx)
    const message = body.message
    console.log(message)

    if (!message) {
      ctx.status = 400
      ctx.body = { error: 'Message is required' }
      return
    }

    ctx.set({
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive'
    })

    const stream = new PassThrough()
    ctx.body = stream

    try {
      const chatResponse = await chat(message)
      const encoder = new TextEncoder()

      if ('delta' in chatResponse) {
        const data = `data: ${JSON.stringify({ text: chatResponse.delta })}\n\n`
        stream.write(encoder.encode(data))
      } else {
        for (const message of chatResponse) {
          const data = `data: ${JSON.stringify({ text: message.content })}\n\n`
          stream.write(encoder.encode(data))
        }
      }
    } catch (error) {
      logger.error(`Chat error: ${error}`)
      const data = `data: ${JSON.stringify({ error: 'Internal server error' })}\n\n`
      stream.write(new TextEncoder().encode(data))
    } finally {
      stream.end()
    }
  })

  // 注册路由
  app.use(router.routes())
  app.use(router.allowedMethods())

  const server = app.listen(46923)
  return server
}
