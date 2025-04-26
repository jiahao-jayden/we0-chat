import type { ProviderId } from './provider'

export type ModelConfig = {
  provider: ProviderId
  config: {
    model: string
    apiKey: string
    isOpen: boolean
  }
  isOpen: boolean
  baseUrl: string
}

export type Theme = 'light' | 'dark' | 'system'

export type Language = 'zh' | 'en'
