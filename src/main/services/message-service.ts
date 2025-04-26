// src\main\service\messageService.ts
import { ipcMain, type BrowserWindow } from 'electron'
import { MessageModel } from '~/shared/schema'
import { BaseService } from './base-service'

//创建数据查询Modal
export interface MsgListDTO extends ListDTO {
  roomId: number
}
//列表查询基类
export interface ListDTO {
  pageNum: number
  pageSize: number
  sort: number
}

export class MessageService extends BaseService {
  static instance: MessageService

  static getInstance(mainWindow: BrowserWindow) {
    if (!this.instance) {
      this.instance = new MessageService(mainWindow)
    }
    return this.instance
  }

  constructor(mainWindow: BrowserWindow) {
    super(mainWindow, 'message')
  }

  async init() {
    await this.ensureConnection()

    //新增数据监听
    ipcMain.on('create-message', async (_event, data: { val: MessageModel }) => {
      const { roomId, content, type } = data.val
      const info = new MessageModel(roomId, content, type)
      const res = await this.create(info)
      this.mainWindow.webContents.send('update-messages', res)
    })

    //获取数据列表监听
    ipcMain.on('get-message', async (_event, data: { params: MsgListDTO }) => {
      const res = await this.getList(data.params)
      this.mainWindow.webContents.send('get-messages', res)
    })
  }

  //实现新增方法
  async create(message: MessageModel) {
    await this.ensureConnection()
    const res = await this.dataSource.manager.save(message)
    return res
  }

  //实现分页查询
  async getList(options: MsgListDTO) {
    await this.ensureConnection()
    const skip = options.pageSize * options.pageNum - options.pageSize
    const sort = options.sort === 2 ? 'ASC' : 'DESC'
    const listAndCount = await this.dataSource
      .createQueryBuilder(MessageModel, 'message')
      .where(`message.roomId = ${options.roomId}`)
      .orderBy('message.id', sort)
      .skip(skip)
      .take(options.pageSize)
      .getManyAndCount()
    return { list: listAndCount[0], count: listAndCount[1] }
  }
}
