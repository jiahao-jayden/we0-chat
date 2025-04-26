export type LLMProvider = {
  id: ProviderId
  name: string
  description: string
  apiUrl: string
  website: string
  logo: React.ReactNode
  modelUrl: string
  features: string[]
}

export type ProviderId = 'openrouter' | 'silicon'
