import { electronAPI } from '@electron-toolkit/preload'
import { contextBridge, ipcRenderer } from 'electron'

// Custom APIs for renderer
const api = {
  onInitSettings: (callback) => {
    const subscription = (_event, data) => callback(data)
    ipcRenderer.on('init-settings', subscription)
    return () => {
      ipcRenderer.removeListener('init-settings', subscription)
    }
  },
  invoke: (channel: string, ...args: any[]) => ipcRenderer.invoke(channel, ...args)
}

const extendedElectronAPI = {
  ...electronAPI
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', extendedElectronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = extendedElectronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
