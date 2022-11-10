import { PrismaClient } from '@prisma/client'

declare global {
  var connection: PrismaClient
}
