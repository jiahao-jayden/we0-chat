import type { BrowserWindow } from 'electron'
import { BaseService } from './base-service'
import logger from '~/lib/logger'
import { ProviderConfigModel } from '~/shared/model'
import type { ProviderConfig } from '~/shared/types/provider'

const defaultProviderConfig: ProviderConfig = {
  id: 'silicon',
  name: 'silicon',
  models: [],
  description: '',
  features: [],
  isInstalled: false,
  baseUrl: '',
  apiUrl: '',
  websiteUrl: '',
  modelUrl: ''
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
      await this.create(
        new ProviderConfigModel(
          defaultProviderConfig.id,
          defaultProviderConfig.isInstalled,
          defaultProviderConfig.baseUrl,
          defaultProviderConfig.name,
          defaultProviderConfig.description,
          defaultProviderConfig.apiUrl,
          defaultProviderConfig.websiteUrl,
          defaultProviderConfig.modelUrl,
          defaultProviderConfig.models,
          defaultProviderConfig.features
        )
      )
    }
  }
}
