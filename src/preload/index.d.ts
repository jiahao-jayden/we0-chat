import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      onInitSettings: (callback: (data: any) => void) => void
      invoke(channel: string, ...args: any[]): Promise<any>
    }
  }
}
