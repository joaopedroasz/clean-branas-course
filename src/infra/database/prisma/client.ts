import { PrismaClient } from '@prisma/client'

import { PrismaClientSingleton } from './PrismaClientSingleton'

let connection: PrismaClient

if (process.env.NODE_ENV === 'production') {
  connection = PrismaClientSingleton.getInstance()
} else {
  if (!global.connection) {
    global.connection = PrismaClientSingleton.getInstance()
  }
  connection = global.connection
}

export { connection }
