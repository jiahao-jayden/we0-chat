// src\main\service\database.ts
import path from 'path'
import { DataSource } from 'typeorm'
import { app } from 'electron'
import { BetterSqlite3ConnectionOptions } from 'typeorm/driver/better-sqlite3/BetterSqlite3ConnectionOptions'
import { MessageModel } from '~/shared/schema'

export class DataBase {
  private static instance: DataBase | null = null
  private dataSource: DataSource

  private constructor(database: string) {
    //使用该方法获取缓存目录从而实现软件升级或卸载数据保留
    // 例：windows下文件存储位置
    // C:\Users\WHWAN\AppData\Roaming\pc-client\data\message.db
    const basePath = path.join(app.getPath('appData'), app.getName(), `./data/${database}.db`)
    console.log(basePath, 'basePath')

    const options: BetterSqlite3ConnectionOptions = {
      type: 'better-sqlite3',
      entities: [MessageModel],
      database: basePath,
      synchronize: true
    }
    this.dataSource = new DataSource(options)
  }

  public static getInstance(database: string): DataBase {
    if (!DataBase.instance) {
      DataBase.instance = new DataBase(database)
    }
    return DataBase.instance
  }

  public getDataSource(): DataSource {
    return this.dataSource
  }
}
