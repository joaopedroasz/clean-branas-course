import { PrismaClient } from '@prisma/client'

import { Order, OrderProps } from '@/domain/entities'
import { CountOrdersRepository } from '@/domain/repositories/Order'
import { CountOrdersPostgresRepository } from '@/infra/database'

const makeOrder = (props?: Partial<OrderProps>): Order => new Order({
  buyerCPF: '25512268139',
  sequence: 1,
  purchaseDate: new Date('2022-10-21'),
  ...props
})

type SutType = {
  sut: CountOrdersRepository
  connection: PrismaClient
}

const connection = new PrismaClient()
const makeSut = (): SutType => {
  const sut = new CountOrdersPostgresRepository(connection)
  return {
    sut,
    connection
  }
}

describe('CountOrdersPostgresRepository', () => {
  beforeAll(async () => {
    const { connection } = makeSut()
    await connection.$connect()
  })

  afterAll(async () => {
    const { connection } = makeSut()
    const deleteOrderItems = connection.orderItem.deleteMany()
    const deleteOrders = connection.order.deleteMany()
    await connection.$transaction([deleteOrders, deleteOrderItems])
    await connection.$disconnect()
  })

  it('should return 0 if there are no orders', async () => {
    const { sut } = makeSut()

    const count = await sut.count()

    expect(count).toBe(0)
  })

  it('should return the amount of created orders', async () => {
    const { sut, connection } = makeSut()

    const orders = [makeOrder({ sequence: 10 }), makeOrder({ sequence: 20 }), makeOrder({ sequence: 30 })]
    await connection.order.createMany({
      data: orders.map(order => ({
        cpf: order.getCPF(),
        code: order.getCode(),
        total: order.getTotalPrice()
      }))
    })

    const count = await sut.count()

    expect(count).toBe(3)
  })
})
