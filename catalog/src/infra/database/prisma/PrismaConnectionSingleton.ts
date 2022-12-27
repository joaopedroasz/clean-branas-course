import { PrismaClient } from '@prisma/client'

export class PrismaConnectionSingleton {
  private static instance?: PrismaConnectionSingleton

  private client?: PrismaClient

  private constructor () {}

  public static getInstance (): PrismaConnectionSingleton {
    if (!PrismaConnectionSingleton.instance) {
      PrismaConnectionSingleton.instance = new PrismaConnectionSingleton()
    }

    return PrismaConnectionSingleton.instance
  }

  public getClient (): PrismaClient {
    if (!this.client) this.client = new PrismaClient()

    return this.client
  }
}
