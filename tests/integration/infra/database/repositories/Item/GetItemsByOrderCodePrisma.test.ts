import { PrismaClient } from '@prisma/client'

import { ItemProps, Item, OrderProps, Order, OrderItem } from '@/domain/entities'
import { GetItemsByOrderCodeRepository } from '@/domain/repositories/Item'
import { GetItemsByOrderCodePrismaRepository } from '@/infra/database'

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

const makeOrder = (props?: Partial<OrderProps>): Order => new Order({
  buyerCPF: '607.109.010-54',
  purchaseDate: new Date('2022-10-17'),
  sequence: 0,
  ...props
})

type SutType = {
  sut: GetItemsByOrderCodeRepository
  connection: PrismaClient
}

const connection = new PrismaClient()
const makeSut = (): SutType => {
  const sut = new GetItemsByOrderCodePrismaRepository(connection)
  return {
    sut,
    connection
  }
}

describe('GetItemsByOrderCodePrismaRepository', () => {
  afterAll(async () => {
    const { connection } = makeSut()
    const deleteOrderCode = connection.orderItem.deleteMany()
    const deleteItems = connection.item.deleteMany()
    const deleteOrder = connection.order.deleteMany()
    await connection.$transaction([deleteOrderCode, deleteItems, deleteOrder])
    await connection.$disconnect()
  })

  it('should return an array of items', async () => {
    const { sut, connection } = makeSut()
    const items: Item[] = [makeItem({ id: 'first_item' }), makeItem({ id: 'second_item' })]
    const createItems = connection.item.createMany({
      data: items.map(item => ({
        id: item.getId(),
        depth: item.getDepth(),
        description: item.getDescription(),
        height: item.getHeight(),
        price: item.getPrice(),
        weight: item.getWeight(),
        width: item.getWidth()
      }))
    })
    const order = makeOrder({ sequence: 1 })
    const createOrder = connection.order.create({
      data: {
        code: order.getCode(),
        cpf: order.getCPF(),
        total: order.getTotalPrice(),
        issue_date: order.getPurchaseDate()
      }
    })
    const [createdOrder] = await connection.$transaction([createOrder, createItems])
    const orderItems = items.map(item => new OrderItem({
      itemId: item.getId(),
      price: item.getPrice(),
      quantity: 1
    }))
    await connection.orderItem.createMany({
      data: orderItems.map(orderItem => ({
        quantity: 1,
        item_id: orderItem.getItemId(),
        order_id: createdOrder.id,
        price: orderItem.calculatePrice()
      }))
    })

    const loadedItems = await sut.getByOrderCode(order.getCode())

    expect(loadedItems).toBeDefined()
    expect(loadedItems).toBeInstanceOf(Array)
    expect(loadedItems).toEqual(items)
  })
})
