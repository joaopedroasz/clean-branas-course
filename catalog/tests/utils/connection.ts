import { PrismaConnectionSingleton } from '@/infra/database'

if (!global.connection) {
  global.connection = PrismaConnectionSingleton.getInstance().getClient()
}

const connection = global.connection

export { connection }
