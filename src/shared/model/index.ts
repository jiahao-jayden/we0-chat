import { Column, Entity, PrimaryColumn } from 'typeorm'
import { DATABASE_VERSION } from '~/shared/appInfo/app-info'
import type { Language, Theme } from '~/shared/types/settings'
import type { Model, ProviderId } from '../types/provider'

/**
 * 设置模型类
 * 用于存储应用程序的全局设置信息
 */
@Entity()
export class SettingModel {
  // 主键 ID，自动生成
  @PrimaryColumn({ type: 'int', generated: true })
  id: number

  // 配置名称
  @Column({ type: 'text', nullable: false })
  configName: string

  // 数据库版本号
  @Column({ type: 'int', nullable: false, default: DATABASE_VERSION })
  version: number

  // 语言设置：中文或英文
  @Column({ type: 'simple-enum', enum: ['zh', 'en'], nullable: false })
  language: Language

  // 主题设置：亮色、暗色或跟随系统
  @Column({ type: 'simple-enum', enum: ['light', 'dark', 'system'], nullable: false })
  theme: Theme

  /**
   * 设置模型构造函数
   * @param configName 配置名称
   * @param providerConfig 提供商配置数组
   * @param language 语言设置
   * @param theme 主题设置
   */
  constructor(configName: string, language: Language, theme: Theme) {
    this.id = 0
    this.version = DATABASE_VERSION
    this.configName = configName
    this.language = language
    this.theme = theme
  }
}

/**
 * 提供商配置模型
 * 用于存储不同 AI 提供商的配置信息
 */
@Entity()
export class ProviderConfigModel {
  // 提供商 ID 作为主键
  @PrimaryColumn({ type: 'varchar', length: 255 })
  id: ProviderId

  // 提供商名称
  @Column({ type: 'text', nullable: false })
  name: string

  // 是否已安装
  @Column({ type: 'boolean', nullable: false, default: false })
  isInstalled: boolean

  // 基础 URL
  @Column({ type: 'text', nullable: false })
  baseUrl: string

  @Column({ type: 'text', nullable: true })
  apiKey?: string

  // 模型配置，以 JSON 字符串形式存储
  @Column({
    type: 'text',
    nullable: false,
    transformer: {
      to: (value: Model) => JSON.stringify(value),
      from: (value: string) => JSON.parse(value)
    }
  })
  models: Model[]

  /**
   * 提供商配置模型构造函数
   * @param providerId 提供商 ID
   * @param isInstalled 是否已安装
   * @param baseUrl 基础 URL
   * @param name 提供商名称
   * @param apiKey 提供商 API Key
   * @param models 支持的模型列表
   */
  constructor(
    providerId: ProviderId,
    isInstalled: boolean,
    baseUrl: string,
    name: string,
    models: Model[],
    apiKey?: string
  ) {
    this.id = providerId
    this.isInstalled = isInstalled
    this.baseUrl = baseUrl
    this.name = name
    this.apiKey = apiKey
    this.models = models
  }
}
