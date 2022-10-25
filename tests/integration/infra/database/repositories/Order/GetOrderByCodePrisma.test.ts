import { PrismaClient } from '@prisma/client'

import { Order, OrderProps } from '@/domain/entities'
import { OrderNotFoundError } from '@/domain/errors'
import { GetOrderByCodeRepository } from '@/domain/repositories/Order'
import { GetOrderByCodePrismaRepository } from '@/infra/database'

const makeOrder = (props?: Partial<OrderProps>): Order => new Order({
  buyerCPF: '67440503112',
  sequence: 1,
  purchaseDate: new Date('2022-10-25T14:25:00'),
  ...props
})

type SutType = {
  sut: GetOrderByCodeRepository
  connection: PrismaClient
}

const connection = new PrismaClient()
const makeSut = (): SutType => {
  const sut = new GetOrderByCodePrismaRepository(connection)
  return {
    sut,
    connection
  }
}

describe('GetOrderByCodePrismaRepository', () => {
  afterAll(async () => {
    const { connection } = makeSut()
    const deleteOrders = connection.order.deleteMany()
    await connection.$transaction([deleteOrders])
    await connection.$disconnect()
  })

  it('should return an existent order by code', async () => {
    const { sut, connection } = makeSut()
    const sequence = 0
    const order = makeOrder({ sequence })

    const { code: createdOrderCode } = await connection.order.create({
      data: {
        cpf: order.getCPF(),
        code: order.getCode(),
        total: order.getTotalPrice(),
        sequence
      }
    })

    const result = await sut.getByCode(createdOrderCode)

    expect(result).toBeDefined()
  })

  it('should throw OrderNotFoundError if order does not exist', async () => {
    const { sut } = makeSut()
    const order = makeOrder()

    const error = sut.getByCode(order.getCode())

    await expect(error).rejects.toThrowError(new OrderNotFoundError({
      targetProperty: 'code',
      targetValue: order.getCode()
    }))
  })

  it('should return an order with same properties as the created order', async () => {
    const { sut, connection } = makeSut()
    const sequence = 1
    const order = makeOrder({ sequence })

    const { code: createdOrderCode } = await connection.order.create({
      data: {
        cpf: order.getCPF(),
        code: order.getCode(),
        total: order.getTotalPrice(),
        sequence,
        issue_date: order.getPurchaseDate()
      }
    })

    const result = await sut.getByCode(createdOrderCode)

    expect(result).toEqual(order)
  })
})
