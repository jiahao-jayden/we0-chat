import { Entity, PrimaryColumn, Column } from 'typeorm'
import type { ModelConfig, Language, Theme } from '~/shared/types/settings'
@Entity()
export class MessageModel {
  @PrimaryColumn({ type: 'int', generated: true })
  id: number

  @Column({ type: 'int8', nullable: false })
  roomId: number

  @Column({ type: 'text', nullable: false })
  content: string

  @Column({ type: 'text', nullable: false })
  type: string

  constructor(roomId: number, content: string, type: string) {
    this.id = 0
    this.roomId = roomId
    this.content = content
    this.type = type
  }
}

@Entity()
export class SettingModel {
  @PrimaryColumn({ type: 'int', generated: true })
  id: number

  @Column({ type: 'text', nullable: false })
  configName: string

  @Column({
    type: 'text',
    nullable: false,
    transformer: {
      to: (value: ModelConfig[]) => JSON.stringify(value),
      from: (value: string) => JSON.parse(value)
    }
  })
  modelConfig: ModelConfig[]

  @Column({ type: 'simple-enum', enum: ['zh', 'en'], nullable: false })
  language: Language

  @Column({ type: 'simple-enum', enum: ['light', 'dark', 'system'], nullable: false })
  theme: Theme

  constructor(configName: string, modelConfig: ModelConfig[], language: Language, theme: Theme) {
    this.id = 0
    this.configName = configName
    this.modelConfig = modelConfig
    this.language = language
    this.theme = theme
  }
}
