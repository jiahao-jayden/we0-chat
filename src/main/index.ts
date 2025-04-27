import { electronApp, optimizer } from '@electron-toolkit/utils'
import { app, BrowserWindow, shell } from 'electron'
import path, { join } from 'path'
import icon from '../../resources/icon.png?asset'
import { registerRoute } from '../lib/electron-router-dom'
import { registerIpc, cleanupIpc } from './register/ipc'

async function createWindow(): Promise<{ mainWindow: BrowserWindow }> {
  const mainWindow = new BrowserWindow({
    width: 980,
    height: 670,
    minWidth: 900,
    minHeight: 600,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      sandbox: false,
      webSecurity: false
    },
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: 'rgba(0,0,0,0)',
      height: 35,
      symbolColor: 'white'
    },
    frame: false
  })
  // 禁用内容安全策略
  mainWindow.webContents.session.webRequest.onHeadersReceived(
    { urls: ['*://*/*'] },
    (details, callback) => {
      if (details.responseHeaders?.['X-Frame-Options']) {
        delete details.responseHeaders['X-Frame-Options']
      }
      if (details.responseHeaders?.['x-frame-options']) {
        delete details.responseHeaders['x-frame-options']
      }
      if (details.responseHeaders?.['Content-Security-Policy']) {
        delete details.responseHeaders['Content-Security-Policy']
      }
      if (details.responseHeaders?.['content-security-policy']) {
        delete details.responseHeaders['content-security-policy']
      }
      callback({ cancel: false, responseHeaders: details.responseHeaders })
    }
  )

  registerRoute({
    id: 'main',
    browserWindow: mainWindow,
    htmlFile: path.join(__dirname, '../renderer/index.html')
  })
  mainWindow.webContents.openDevTools()

  // 注册 Koa 服务
  // koaServer = await registerKoa()

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // 添加窗口关闭事件处理
  mainWindow.on('close', async (event) => {
    event.preventDefault()
    try {
      // 清理 IPC
      await cleanupIpc()
      // 关闭开发者工具
      if (mainWindow.webContents.isDevToolsOpened()) {
        mainWindow.webContents.closeDevTools()
      }
      // 销毁窗口
      mainWindow.destroy()
    } catch (error) {
      console.error('Error during window cleanup:', error)
      mainWindow.destroy()
    }
  })

  return { mainWindow }
}

app.whenReady().then(async () => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })
  app.commandLine.appendSwitch('ignore-certificate-errors')

  const { mainWindow } = await createWindow()

  app.on('activate', async function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) await createWindow()
  })

  // 注册 ipc
  await registerIpc(mainWindow, app)
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', async () => {
  await cleanupIpc()
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// 在应用退出前确保清理
app.on('before-quit', async (event) => {
  event.preventDefault()
  await cleanupIpc()
  app.exit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
