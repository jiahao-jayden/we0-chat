import { type IpcMain, type BrowserWindow } from 'electron'
import logger from '~/lib/logger'
import { MessageService } from '../services/message-service'

let messageService: MessageService | null = null

export function registerIpc(ipcMain: IpcMain, mainWindow: BrowserWindow) {
  logger.info('registerIpc')
  messageService = MessageService.getInstance(mainWindow)
  messageService.init()
}

export async function cleanupIpc() {
  if (messageService) {
    await messageService.cleanup()
    messageService = null
  }
}
