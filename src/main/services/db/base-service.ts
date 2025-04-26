import { DataSource, EntityTarget, ObjectLiteral, type FindOptionsWhere } from 'typeorm'
import { DataBase } from '..'
import type { BrowserWindow } from 'electron'

export abstract class BaseService {
  protected dataSource: DataSource
  protected mainWindow: BrowserWindow
  protected isInitialized: boolean = false

  constructor(mainWindow: BrowserWindow) {
    this.dataSource = DataBase.getInstance().getDataSource()
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

  public async create<T>(entity: T): Promise<T> {
    await this.ensureConnection()
    return this.dataSource.manager.save(entity)
  }

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

  public async findOne<T extends ObjectLiteral>(
    entityClass: EntityTarget<T>,
    options: FindOptionsWhere<T>
  ): Promise<T | null> {
    await this.ensureConnection()
    return this.dataSource.manager.findOneBy(entityClass, options)
  }

  public async findById<T extends ObjectLiteral & { id: string | number }>(
    entityClass: EntityTarget<T>,
    id: T['id']
  ): Promise<T | null> {
    await this.ensureConnection()
    return this.dataSource.manager.findOneBy(entityClass, { id } as any)
  }
}
