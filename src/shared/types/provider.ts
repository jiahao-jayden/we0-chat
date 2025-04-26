export type LLMProvider = {
  id: ProviderId
  name: string
  description: string
  apiUrl: string
  website: string
  logo: React.ReactNode
  modelUrl: string
  features: string[]
  models: ProviderModel[]
}

export type ProviderModel = {
  name: string
  iconId: string
  description?: string
}

export type ProviderId = 'openrouter' | 'silicon'
