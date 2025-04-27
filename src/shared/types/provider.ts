import type { ProviderConfigModel } from '../model'

/**
 * 模型提供商
 */
export type ProviderConfig = ProviderConfigModel

export type SystemProviderConfig = Omit<ProviderConfig, 'apiKey'>
/**
 * 模型
 */
export type Model = {
  name: string
  modelId: string
  isOpen: boolean
}

type ModelConfig = Model & {
  iconId: IconId
  features: Feature[]
}

export type SystemModelConfig = Omit<ModelConfig, 'isOpen'>

/**
 * 模型配置
 */
export type UserModelConfig = ModelConfig

/**
 * 模型的功能
 */
export type Feature = 'LLM' | 'FILE_UPLOAD' | 'TEXT_EMBEDDING' | 'IMAGE_EMBEDDING' | 'TEXT_TO_IMAGE'

/**
 * 模型图标Id
 */
export type IconId = 'deepseek-v3' | 'gemma' | 'phi' | 'llama3' | 'mistral' | 'qwen' | 'bge'

/**s
 * 提供商Id
 */
export type ProviderId = 'openrouter' | 'silicon'
