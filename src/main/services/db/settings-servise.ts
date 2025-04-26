import type { ModelConfig } from '~/shared/types/settings'
import { BaseService } from './base-service'
import { SettingModel } from '~/shared/schema'
import { ipcMain, type BrowserWindow } from 'electron'

const defaultConfig: ModelConfig[] = [
  {
    provider: 'silicon',
    config: {
      model: 'deepseek-ai/DeepSeek-R1',
      apiKey: '',
      isOpen: false
    },
    isOpen: false,
    baseUrl: ''
  }
]

export class SettingsService extends BaseService {
  constructor(mainWindow: BrowserWindow) {
    super(mainWindow)
  }

  async init() {
    await super.ensureConnection()
    // 检查用户存不存在配置，不存在就新建
    const setting = await this.findOne(SettingModel, { configName: 'default' })
    if (!setting) {
      await this.create(new SettingModel('default', defaultConfig, 'zh', 'light'))
    }
    // 通知渲染进程去存储和同步
    this.mainWindow.webContents.send('db:settings-updated', setting)

    // 获取配置
    ipcMain.handle('db:get-settings', async (_, configName: string) => {
      const setting = await this.findOne(SettingModel, { configName })
      return setting
    })
  }
}
