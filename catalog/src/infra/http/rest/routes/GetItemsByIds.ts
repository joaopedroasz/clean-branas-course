import { PrismaClient } from '@prisma/client'

import { GetItemsByIdsUseCase } from '@/application/UseCases'
import { ServerHttpRest } from '../contracts'
import { GetItemsByIdsHttpController } from '../../controllers'
import { ItemPrismaRepository } from '@/infra/database'

export class GetItemsByIdsRoute {
  constructor (serverHttp: ServerHttpRest, prismaClient: PrismaClient) {
    const itemPrismaRepository = new ItemPrismaRepository(prismaClient)
    const getItemsByIdsUseCase = new GetItemsByIdsUseCase(itemPrismaRepository)
    const getItemsByIdsHttpController = new GetItemsByIdsHttpController(getItemsByIdsUseCase)
    serverHttp.on('get', '/items', getItemsByIdsHttpController)
  }
}
