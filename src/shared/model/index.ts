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

  // 与提供商配置的一对多关系
  @Column({ type: 'simple-array', nullable: false })
  providerConfig: string[]

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
  constructor(configName: string, providerConfig: string[], language: Language, theme: Theme) {
    this.id = 0
    this.version = DATABASE_VERSION
    this.configName = configName
    this.providerConfig = providerConfig
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

  // 提供商 API URL
  @Column({ type: 'text', nullable: true })
  apiUrl: string

  // 提供商网站
  @Column({ type: 'text', nullable: true })
  websiteUrl: string

  // 模型列表地址
  @Column({ type: 'text', nullable: true })
  modelUrl: string

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

  // 提供商描述
  @Column({ type: 'text', nullable: true })
  description: string

  // 支持的特性列表
  @Column({ type: 'simple-array', nullable: true })
  features: string[]

  /**
   * 提供商配置模型构造函数
   * @param providerId 提供商 ID
   * @param isInstalled 是否已安装
   * @param baseUrl 基础 URL
   * @param name 提供商名称
   * @param description 描述信息
   * @param apiUrl 提供商 API URL
   * @param websiteUrl 提供商网站
   * @param modelUrl 模型列表地址
   * @param models 支持的模型列表
   * @param features 支持的特性列表
   */
  constructor(
    providerId: ProviderId,
    isInstalled: boolean,
    baseUrl: string,
    name: string,
    description: string,
    apiUrl: string,
    websiteUrl: string,
    modelUrl: string,
    models: Model[],
    features: string[]
  ) {
    this.id = providerId
    this.isInstalled = isInstalled
    this.baseUrl = baseUrl
    this.name = name
    this.description = description
    this.apiUrl = apiUrl
    this.websiteUrl = websiteUrl
    this.modelUrl = modelUrl
    this.models = models
    this.features = features
  }
}
