import { DataSource } from 'typeorm'
import { DataBase } from './'
import { BrowserWindow } from 'electron'

export abstract class BaseService {
  protected dataSource: DataSource
  protected mainWindow: BrowserWindow
  protected isInitialized: boolean = false

  constructor(mainWindow: BrowserWindow, dbName: string) {
    this.dataSource = DataBase.getInstance(dbName).getDataSource()
    this.mainWindow = mainWindow
  }

  protected async ensureConnection() {
    if (!this.isInitialized) {
      await this.dataSource.initialize()
      this.isInitialized = true
    }
  }

  public async cleanup() {
    if (this.isInitialized) {
      await this.dataSource.destroy()
      this.isInitialized = false
    }
  }

  abstract init(): Promise<void>
}
