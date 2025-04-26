import { type BrowserWindow } from 'electron'
import logger from '~/lib/logger'
import { SettingsService } from '../services/db/settings-servise'

let settingsService: SettingsService | null = null

export function registerIpc(mainWindow: BrowserWindow) {
  logger.info('registerIpc')
  settingsService = new SettingsService(mainWindow)
  // 初始化 db:settings 数据
  settingsService.init()
}

export async function cleanupIpc() {
  if (settingsService) {
    await settingsService.cleanup()
    settingsService = null
  }
}
