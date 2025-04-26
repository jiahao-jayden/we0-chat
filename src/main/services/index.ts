// src\main\service\database.ts
import { app } from 'electron'
import path from 'path'
import { DataSource } from 'typeorm'
import { BetterSqlite3ConnectionOptions } from 'typeorm/driver/better-sqlite3/BetterSqlite3ConnectionOptions'
import { SettingModel } from '~/shared/schema'

const DATABASE_NAME = 'we0Chat'
export class DataBase {
  private static instance: DataBase | null = null
  private dataSource: DataSource

  private constructor() {
    //使用该方法获取缓存目录从而实现软件升级或卸载数据保留
    // 例：windows下文件存储位置
    // C:\Users\WHWAN\AppData\Roaming\pc-client\data\message.db
    const basePath = path.join(app.getPath('appData'), app.getName(), `./data/${DATABASE_NAME}.db`)
    console.log(basePath, 'basePath')

    const options: BetterSqlite3ConnectionOptions = {
      type: 'better-sqlite3',
      entities: [SettingModel],
      database: basePath,
      synchronize: true
    }
    this.dataSource = new DataSource(options)
  }

  public static getInstance(): DataBase {
    if (!DataBase.instance) {
      DataBase.instance = new DataBase()
    }
    return DataBase.instance
  }

  public getDataSource(): DataSource {
    return this.dataSource
  }
}
