import type { ProviderConfigModel } from '../model'

/**
 * 模型提供商
 */
export type ProviderConfig = ProviderConfigModel

/**
 * 模型
 */
export type Model = {
  name: string
  iconId: IconId
  isOpen: boolean
}

/**
 * 模型图标Id
 */
export type IconId = 'deepseek-v3'

/**
 * 提供商Id
 */
export type ProviderId = 'openrouter' | 'silicon'
