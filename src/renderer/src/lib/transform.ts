import { SYSTEM_PROVIDERS, SYSTEM_MODELS } from '@/constant/providers'
import type { UserProviderConfig } from '@/types/provider'
import type { ProviderConfig } from '~/shared/types/provider'

export const transformProviderConfig = (
  providerConfigs: ProviderConfig[]
): UserProviderConfig[] => {
  // 遍历全部的数据
  return providerConfigs.map((providerConfig) => {
    const { id, name, models, isInstalled, baseUrl, apiKey } = providerConfig
    const Icon = SYSTEM_PROVIDERS[id].logo
    const features = SYSTEM_PROVIDERS[id].features

    // 从 SYSTEM_MODELS 中获取完整的模型信息
    const systemModels = SYSTEM_MODELS[id]
    const transformedModels = systemModels.map((systemModel) => {
      const userModel = models.find((m) => m.modelId === systemModel.modelId)
      return {
        ...systemModel,
        isOpen: userModel?.isOpen ?? false
      }
    })

    return {
      id,
      name,
      models: transformedModels,
      isInstalled,
      baseUrl,
      apiKey,
      logo: Icon,
      description: SYSTEM_PROVIDERS[id].description,
      features,
      apiUrl: SYSTEM_PROVIDERS[id].apiUrl,
      websiteUrl: SYSTEM_PROVIDERS[id].websiteUrl,
      modelUrl: SYSTEM_PROVIDERS[id].modelUrl,
      category: apiKey ? 'isConfigured' : 'unConfigured'
    }
  })
}
