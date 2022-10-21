import { PrismaClient } from '@prisma/client'

import { Item, ItemProps, Order } from '@/domain/entities'
import { SaveOrderRepository } from '@/domain/repositories/Order'
import { SaveOrderPostgresRepository } from '@/infra/database/repositories/Order'

type SutType = {
  sut: SaveOrderRepository
  connection: PrismaClient
}

const makeItem = (props?: Partial<ItemProps>): Item => new Item({
  id: 'any_id',
  description: 'any_description',
  price: 1,
  depthInCm: 1,
  heightInCm: 1,
  weightInKg: 1,
  widthInCm: 1,
  ...props
})

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
    await connection.item.deleteMany()
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

  it('should save an order and return order items', async () => {
    const { sut, connection } = makeSut()
    const item1 = makeItem({ id: 'any_id_1' })
    await connection.item.create({
      data: {
        id: item1.getId(),
        description: item1.getDescription(),
        price: item1.getPrice(),
        depth: item1.getDepth(),
        height: item1.getHeight(),
        weight: item1.getWeight(),
        width: item1.getWidth()
      }
    })
    const item2 = makeItem({ id: 'any_id_2' })
    await connection.item.create({
      data: {
        id: item2.getId(),
        description: item2.getDescription(),
        price: item2.getPrice(),
        depth: item2.getDepth(),
        height: item2.getHeight(),
        weight: item2.getWeight(),
        width: item2.getWidth()
      }
    })
    const order = new Order({
      buyerCPF: '60710901054',
      sequence: 2,
      purchaseDate: new Date('2022-10-20T14:00:00')
    })
    order.addItem({ item: item1, quantity: 1 })
    order.addItem({ item: item2, quantity: 2 })

    const createdOrder = await sut.save(order)

    expect(createdOrder.getOrderItems()).toBeDefined()
    expect(createdOrder.getOrderItems()).toHaveLength(2)
  })
})
