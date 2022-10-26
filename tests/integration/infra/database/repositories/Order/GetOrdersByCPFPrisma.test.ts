import { PrismaClient } from '@prisma/client'

import { Order, OrderProps } from '@/domain/entities'
import { GetOrdersByCPFRepository } from '@/domain/repositories/Order'
import { GetOrdersByCPFPrismaRepository } from '@/infra/database'

const makeOrder = (props?: Partial<OrderProps>): Order => new Order({
  buyerCPF: '607.109.010-54',
  purchaseDate: new Date('2022-10-17'),
  sequence: 0,
  ...props
})

type SutType = {
  sut: GetOrdersByCPFRepository
  connection: PrismaClient
}

const connection = new PrismaClient()
const makeSut = (): SutType => {
  const sut = new GetOrdersByCPFPrismaRepository(connection)

  return {
    sut,
    connection
  }
}

describe('GetOrdersByCPFPrismaRepository', () => {
  afterAll(async () => {
    const { connection } = makeSut()
    const deleteOrders = connection.order.deleteMany()
    await connection.$transaction([deleteOrders])
    await connection.$disconnect()
  })

  it('should return valid orders by CPF', async () => {
    const { sut } = makeSut()
    const CPF = '209.254.445-45'
    const orders: Order[] = [makeOrder({ buyerCPF: CPF, sequence: 0 }), makeOrder({ buyerCPF: CPF, sequence: 1 })]
    await connection.order.createMany({
      data: orders.map(order => ({
        cpf: order.getCPF(),
        code: order.getCode(),
        total: order.getTotalPrice(),
        issue_date: order.getPurchaseDate()
      }))
    })

    const result = await sut.getByCPF(CPF)

    expect(result).toBeDefined()
    expect(result).toBeInstanceOf(Array)
    expect(result).toHaveLength(2)
  })
})
