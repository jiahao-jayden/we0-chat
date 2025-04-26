import { createOpenRouter } from '@openrouter/ai-sdk-provider'
import { CoreMessage, streamText } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'

const messages: CoreMessage[] = []

const openrouter = createOpenRouter({
  apiKey: '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'
})

const openai = createOpenAI({
  apiKey: 'sk-stinivkpoupcgtwueydxdkxqcmiprxhlmvcsxttmyyakcdkn',
  baseURL: 'https://api.siliconflow.cn'
})

export function chat(userInput: string) {
  messages.push({ role: 'user', content: userInput })

  const result = streamText({
    model: openai('deepseek-ai/DeepSeek-V3'),
    messages,
    headers: {
      Connection: 'keep-alive',
      'user-agent': 'Visual Studio Code (desktop)',
      'Sec-Fetch-Site': 'none',
      'Sec-Fetch-Mode': 'no-cors',
      'Sec-Fetch-Dest': 'empty'
    }
  })

  return result.textStream
}
