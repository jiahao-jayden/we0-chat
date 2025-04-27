import type { BrowserWindow } from 'electron'
import { BaseService } from './base-service'
import logger from '~/lib/logger'
import { ProviderConfigModel } from '~/shared/model'
import type { ProviderConfig } from '~/shared/types/provider'

const defaultProviderConfig: ProviderConfig = {
  id: 'silicon',
  name: '硅基流动',
  models: [
    {
      name: 'deepseek-ai/DeepSeek-R1',
      modelId: 'deepseek-ai/DeepSeek-R1',
      isOpen: true
    },
    {
      name: 'deepseek-ai/DeepSeek-V3',
      modelId: 'deepseek-ai/DeepSeek-V3',
      isOpen: true
    },
    {
      name: 'Qwen/Qwen2.5-7B-Instruct',
      modelId: 'Qwen/Qwen2.5-7B-Instruct',
      isOpen: true
    },
    {
      name: 'meta-llama/Llama-3.3-70B-Instruct',
      modelId: 'meta-llama/Llama-3.3-70B-Instruct',
      isOpen: true
    },
    {
      name: 'BAAI/bge-m3',
      modelId: 'BAAI/bge-m3',
      isOpen: true
    }
  ],
  isInstalled: false,
  baseUrl: 'https://api.siliconflow.com/v1'
}
export class ProviderService extends BaseService {
  constructor(mainWindow: BrowserWindow) {
    super(mainWindow)
  }

  async init() {
    await super.ensureConnection()
    logger.info('init provider')
    // 只有当没有任何提供商信息时才创建默认提供商
    const providers = await this.findAll(ProviderConfigModel)
    if (providers.length === 0) {
      console.log(defaultProviderConfig.models, 'defaultProviderConfig.models')

      await this.create(
        new ProviderConfigModel(
          defaultProviderConfig.id,
          defaultProviderConfig.isInstalled,
          defaultProviderConfig.baseUrl,
          defaultProviderConfig.name,
          defaultProviderConfig.models
        )
      )
    }
  }
  async getAllProviders() {
    const providers = await this.findAll(ProviderConfigModel)
    return providers
  }
}
