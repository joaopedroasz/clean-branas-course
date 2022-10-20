import { PrismaClient } from '@prisma/client'

import { Order } from '@/domain/entities'
import { SaveOrderRepository } from '@/domain/repositories/Order'
import { SaveOrderPostgresRepository } from '@/infra/database/repositories/Order'

type SutType = {
  sut: SaveOrderRepository
  connection: PrismaClient
}

const makeSut = (): SutType => {
  const connection = new PrismaClient()
  const sut = new SaveOrderPostgresRepository(connection)

  return {
    sut,
    connection
  }
}

describe('SaveOrderPostgresRepository', () => {
  beforeAll(async () => {
    const { connection } = makeSut()
    await connection.$connect()

    await connection.orderItem.deleteMany()
    await connection.order.deleteMany()
  })

  afterAll(async () => {
    const { connection } = makeSut()
    await connection.$disconnect()
  })

  it('should save an order', async () => {
    const { sut } = makeSut()

    const order = await sut.save(new Order({
      buyerCPF: '60710901054',
      sequence: 1,
      purchaseDate: new Date('2022-10-20T14:00:00')
    }))

    expect(order).toBeDefined()
  })
})
