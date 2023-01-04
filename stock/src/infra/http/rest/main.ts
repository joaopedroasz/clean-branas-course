import { DecreaseStockUseCase } from '@/application/UseCases'
import { RabbitMQAdapter, StockQueue } from '@/infra/queue'
import { GetStockEntriesByItemIdPrismaRepository, PrismaConnectionSingleton, SaveStockEntryPrismaRepository } from '@/infra/database'

import { ServerHttpRestExpressAdapter } from './express'
import { DecreaseStockRoute } from './routes'

async function main (): Promise<void> {
  const httpServer = new ServerHttpRestExpressAdapter()
  const prismaConnection = PrismaConnectionSingleton.getInstance().getClient()
  new DecreaseStockRoute(httpServer, prismaConnection)

  const getStockEntriesPrismaRepository = new GetStockEntriesByItemIdPrismaRepository(prismaConnection)
  const saveStockEntryPrismaRepository = new SaveStockEntryPrismaRepository(prismaConnection)
  const decreaseStockUseCase = new DecreaseStockUseCase(getStockEntriesPrismaRepository, saveStockEntryPrismaRepository)

  const queue = new RabbitMQAdapter()
  await queue.connect()
  new StockQueue(queue, decreaseStockUseCase)

  httpServer.listen(3030)
}

main().catch(console.error)
