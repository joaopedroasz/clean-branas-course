import { PrismaClient } from '@prisma/client'

import { GetCouponByCodeRepository } from '@/domain/repositories/Coupon'
import { GetItemByIdRepository } from '@/domain/repositories/Item'
import { CountOrdersRepository, SaveOrderRepository } from '@/domain/repositories/Order'
import { PlaceOrderUseCase } from '@/application/UseCases'
import { PlaceOrderInputDTO } from '@/application/DTOs'
import {
  CalculateFreightGateway,
  CalculateFreightOutput,
  DecreaseStockGateway,
  DecreaseStockOutput,
  PlaceOrder
} from '@/application/contracts'
import { Queue, RabbitMQAdapter } from '@/infra/queue'
import {
  CountOrdersPrismaRepository,
  GetCouponByCodePrismaRepository,
  GetItemByIdPrismaRepository,
  SaveOrderPrismaRepository,
  connection
} from '@/infra/database'
import { deleteAll } from '@/tests/utils'

const makeCalculateFreightGateway = (): CalculateFreightGateway => ({
  calculate: async (): Promise<CalculateFreightOutput> => ({
    freight: 10
  })
})

const makeDecreaseStockGateway = (): DecreaseStockGateway => ({
  decrease: async (): Promise<DecreaseStockOutput> => ({
    itemId: 'any_id',
    availableQuantity: 1
  })
})

type SutType = {
  database: PrismaClient
  sut: PlaceOrder
  getItemByIdRepository: GetItemByIdRepository
  getCouponByCodeRepository: GetCouponByCodeRepository
  saveOrderRepository: SaveOrderRepository
  countOrdersRepository: CountOrdersRepository
  calculateFreightGateway: CalculateFreightGateway
  decreaseStockGateway: DecreaseStockGateway
  queue: Queue
}

const makeSut = (): SutType => {
  const getItemByIdRepository = new GetItemByIdPrismaRepository(connection)
  const getCouponByCodeRepository = new GetCouponByCodePrismaRepository(connection)
  const saveOrderRepository = new SaveOrderPrismaRepository(connection)
  const countOrdersRepository = new CountOrdersPrismaRepository(connection)
  const calculateFreightGateway = makeCalculateFreightGateway()
  const decreaseStockGateway = makeDecreaseStockGateway()
  const queue = new RabbitMQAdapter()
  const sut = new PlaceOrderUseCase(
    getItemByIdRepository,
    getCouponByCodeRepository,
    saveOrderRepository,
    countOrdersRepository,
    calculateFreightGateway,
    decreaseStockGateway,
    queue
  )
  return {
    sut,
    getItemByIdRepository,
    getCouponByCodeRepository,
    saveOrderRepository,
    countOrdersRepository,
    calculateFreightGateway,
    decreaseStockGateway,
    queue,
    database: connection
  }
}

describe('PlaceOrder UseCase', () => {
  beforeAll(async () => {
    await deleteAll(connection)
  })

  it('should place one order', async () => {
    await connection.item.createMany({
      data: [
        {
          id: '1',
          depth: 10,
          description: 'any_description',
          height: 10,
          price: 10,
          weight: 10,
          width: 10,
          density: 10,
          volume: 10
        }, {
          id: '2',
          depth: 10,
          description: 'any_description',
          height: 10,
          price: 10,
          weight: 10,
          width: 10,
          density: 10,
          volume: 10
        }
      ]
    })

    const { sut, database, queue } = makeSut()
    await database.$connect()
    await queue.connect()
    const input: PlaceOrderInputDTO = {
      buyerCPF: '607.109.010-54',
      orderItems: [
        { itemId: '1', quantity: 1 },
        { itemId: '2', quantity: 2 }
      ],
      from: 'any_from',
      to: 'any_to'
    }

    const result = await sut.execute(input)

    expect(result.total).toBe(40)
  })
})
