import { DataSource, EntityTarget, ObjectLiteral, type FindOptionsWhere } from 'typeorm'
import { DataBase } from '..'
import type { BrowserWindow } from 'electron'
import logger from '~/lib/logger'

export abstract class BaseService {
  protected dataSource: DataSource
  protected mainWindow: BrowserWindow
  protected isInitialized: boolean = false
  private connectionRetries: number = 0
  private readonly MAX_RETRIES: number = 3

  constructor(mainWindow: BrowserWindow) {
    this.dataSource = DataBase.getInstance().getDataSource()
    this.mainWindow = mainWindow
  }

  protected async ensureConnection(): Promise<void> {
    try {
      if (!this.dataSource.isInitialized) {
        logger.info(`Initializing database connection...`)
        await this.dataSource.initialize()
        this.isInitialized = true
        logger.info(`Database connection initialized successfully`)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      logger.error(`Failed to initialize database connection: ${errorMessage}`)
      if (this.connectionRetries < this.MAX_RETRIES) {
        this.connectionRetries++
        logger.info(`Retrying connection (attempt ${this.connectionRetries})...`)
        await new Promise((resolve) => setTimeout(resolve, 1000)) // 等待1秒后重试
        return this.ensureConnection()
      }
      throw new Error('Failed to establish database connection after multiple retries')
    }
  }

  protected async findOne<T extends ObjectLiteral>(
    entity: EntityTarget<T>,
    where: FindOptionsWhere<T>
  ): Promise<T | null> {
    await this.ensureConnection()
    return this.dataSource.getRepository(entity).findOne({ where })
  }

  protected async findAll<T extends ObjectLiteral>(entity: EntityTarget<T>): Promise<T[]> {
    await this.ensureConnection()
    return this.dataSource.getRepository(entity).find()
  }

  protected async create<T extends ObjectLiteral>(entity: T): Promise<T> {
    await this.ensureConnection()
    return this.dataSource.getRepository(entity.constructor as EntityTarget<T>).save(entity)
  }

  async cleanup(): Promise<void> {
    if (this.dataSource.isInitialized) {
      await this.dataSource.destroy()
      this.isInitialized = false
      logger.info(`Database connection closed`)
    }
  }

  abstract init(): Promise<void>

  public async update<T extends ObjectLiteral>(
    entityClass: EntityTarget<T>,
    criteria: FindOptionsWhere<T>,
    partialEntity: Partial<T>
  ): Promise<void> {
    await this.ensureConnection()
    await this.dataSource.manager.update(entityClass, criteria, partialEntity)
  }

  public async delete<T extends ObjectLiteral>(
    entityClass: EntityTarget<T>,
    criteria: FindOptionsWhere<T>
  ): Promise<void> {
    await this.ensureConnection()
    await this.dataSource.manager.delete(entityClass, criteria)
  }

  public async findById<T extends ObjectLiteral & { id: string | number }>(
    entityClass: EntityTarget<T>,
    id: string | number
  ): Promise<T | null> {
    await this.ensureConnection()
    return this.dataSource.manager.findOneBy(entityClass, { id } as any)
  }
}
