import { PrismaClient } from '@prisma/client'

import { ServerHttpRest } from '../contracts'
import { DecreaseStockHttpController } from '../../controllers'
import { DecreaseStockUseCase } from '@/application/UseCases'
import { GetStockEntriesByItemIdPrismaRepository, SaveStockEntryPrismaRepository } from '@/infra/database'

export class DecreaseStockRoute {
  constructor (httpRest: ServerHttpRest, prismaClient: PrismaClient) {
    const getStockEntriesPrismaRepository = new GetStockEntriesByItemIdPrismaRepository(prismaClient)
    const saveStockEntryPrismaRepository = new SaveStockEntryPrismaRepository(prismaClient)
    const decreaseStockUseCase = new DecreaseStockUseCase(getStockEntriesPrismaRepository, saveStockEntryPrismaRepository)
    const decreaseStockHttpController = new DecreaseStockHttpController(decreaseStockUseCase)
    httpRest.on('post', '/stock/decrease', decreaseStockHttpController)
  }
}
