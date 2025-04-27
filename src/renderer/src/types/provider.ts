import type { SystemModelConfig, SystemProviderConfig } from '~/shared/types/provider'

export type UserProviderConfig = SystemProviderConfig & {
  logo: React.ReactNode
  description: string
  features: string[]
  models: SystemModelConfig[]
  apiUrl: string
  websiteUrl: string
  modelUrl: string
  category: 'isConfigured' | 'unConfigured'
}
