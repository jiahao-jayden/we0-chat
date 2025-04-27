import { drizzle } from 'drizzle-orm/sqlite-proxy'
import * as schema from '../../../shared/model'

export const database = drizzle(
  async (...args) => {
    try {
      const result = await window.api.executeSql(...args)
      return { rows: Array.isArray(result) ? result : [] }
    } catch (e: any) {
      console.error('Error from sqlite proxy server: ', e.response?.data)
      return { rows: [] }
    }
  },
  {
    schema: schema
  }
)
