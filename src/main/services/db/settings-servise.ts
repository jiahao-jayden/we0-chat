import { ipcMain, type BrowserWindow } from 'electron'
import { DATABASE_VERSION } from '~/shared/appInfo/app-info'
import logger from '~/lib/logger'
import { SettingModel } from '~/shared/model'
import type { Setting } from '~/shared/types/settings'
import { BaseService } from './base-service'
import type { ProviderService } from './provider-service'

const defaultSetting: Omit<Setting, 'id'> = {
  configName: 'default',
  version: DATABASE_VERSION,
  language: 'zh',
  theme: 'light'
}

export class SettingsService extends BaseService {
  private ipcHandlerRegistered: boolean = false
  private providerService: ProviderService

  constructor(mainWindow: BrowserWindow, providerService: ProviderService) {
    super(mainWindow)
    this.registerIpcHandlers()
    this.providerService = providerService
  }

  private async transformSetting(setting: SettingModel) {
    const providers = await this.providerService.getAllProviders()
    return { ...setting, providers }
  }

  private registerIpcHandlers() {
    if (this.ipcHandlerRegistered) {
      return
    }

    try {
      ipcMain.handle('db:get-settings', async (_, configName: string) => {
        try {
          logger.info(`Getting settings for config: ${configName}`)
          const setting = await this.findOne(SettingModel, { configName })
          if (!setting) {
            logger.warn(`Settings not found for config: ${configName}`)
            return null
          }
          return this.transformSetting(setting)
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error)
          logger.error(`Error getting settings: ${errorMessage}`)
          throw error
        }
      })

      this.ipcHandlerRegistered = true
      logger.info('IPC handlers registered for settings service')
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      logger.error(`Failed to register IPC handlers: ${errorMessage}`)
      throw error
    }
  }

  async init() {
    try {
      await super.ensureConnection()
      logger.info(`Initializing settings`)

      // 检查用户存不存在配置，不存在就新建
      const setting = await this.findAll(SettingModel)
      if (setting.length === 0) {
        await this.create(
          new SettingModel(defaultSetting.configName, defaultSetting.language, defaultSetting.theme)
        )
        logger.info(`Created default settings`)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      logger.error(`Failed to initialize settings: ${errorMessage}`)
      throw error
    }
  }

  async cleanup() {
    if (this.ipcHandlerRegistered) {
      ipcMain.removeHandler('db:get-settings')
      this.ipcHandlerRegistered = false
      logger.info('IPC handlers removed for settings service')
    }
    await super.cleanup()
  }
}
