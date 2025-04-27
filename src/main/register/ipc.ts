import { type App, type BrowserWindow } from 'electron'
import logger from '~/lib/logger'
import { SettingsService } from '../services/db/settings-servise'
import { ProviderService } from '../services/db/provider-service'

let settingsService: SettingsService | null = null
let providerService: ProviderService | null = null

export async function registerIpc(mainWindow: BrowserWindow, app: App) {
  logger.info('registerIpc')
  settingsService = new SettingsService(mainWindow, providerService)
  providerService = new ProviderService(mainWindow)

  // 初始化 db:settings 数据
  await settingsService.init()
  // 初始化 db:provider 数据
  await providerService.init()
}

export async function cleanupIpc() {
  if (settingsService) {
    await settingsService.cleanup()
    settingsService = null
  }
  if (providerService) {
    await providerService.cleanup()
    providerService = null
  }
}
