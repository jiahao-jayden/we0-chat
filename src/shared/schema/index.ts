import { Entity, PrimaryColumn, Column } from 'typeorm'

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
    this.roomId = roomId
    this.content = content
    this.type = type
  }
}
