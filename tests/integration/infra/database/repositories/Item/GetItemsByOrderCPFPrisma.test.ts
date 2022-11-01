import { PrismaClient } from '@prisma/client'

import { Item, ItemProps, Order, OrderProps } from '@/domain/entities'
import { GetItemsByOrderCPFRepository } from '@/domain/repositories/Item'
import { GetItemsByOrderCPFPrismaRepository } from '@/infra/database'

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
  buyerCPF: '680.847.383-80',
  purchaseDate: new Date('2022-11-01'),
  sequence: 0,
  ...props
})

type SutType = {
  sut: GetItemsByOrderCPFRepository
  connection: PrismaClient
}

const connection = new PrismaClient()
const makeSut = (): SutType => {
  const sut = new GetItemsByOrderCPFPrismaRepository(connection)

  return {
    sut,
    connection
  }
}

describe('GetItemsByOrderCPFPrismaRepository', () => {
  afterAll(async () => {
    const { connection } = makeSut()
    const deleteOrders = connection.order.deleteMany()
    const deleteOrderItems = connection.orderItem.deleteMany()
    const deleteItems = connection.item.deleteMany()
    await connection.$transaction([deleteOrders, deleteOrderItems, deleteItems])
    await connection.$disconnect()
  })

  it('should return items by order CPF', async () => {
    const { connection, sut } = makeSut()
    const itemsIds: string[] = ['any_id', 'other_id']
    const items: Item[] = itemsIds.map(id => makeItem({ id }))
    const order = makeOrder()
    items.forEach(item => {
      order.addItem({ item, quantity: 1 })
    })
    const { id: createdOrderId } = await connection.order.create({
      data: {
        cpf: order.getCPF(),
        code: order.getCode(),
        total: order.getTotalPrice()
      }
    })
    await connection.item.createMany({
      data: items.map(item => ({
        id: item.getId(),
        description: item.getDescription(),
        price: item.getPrice(),
        depth: item.getDepth(),
        height: item.getHeight(),
        weight: item.getWeight(),
        width: item.getWidth()
      }))
    })
    await connection.orderItem.createMany({
      data: order.getOrderItems().map(orderItem => ({
        item_id: orderItem.getItemId(),
        order_id: createdOrderId,
        price: orderItem.calculatePrice(),
        quantity: orderItem.getQuantity()
      }))
    })

    const itemsByOrderCPF = await sut.getByOrderCPF(order.getCPF())

    expect(itemsByOrderCPF).toHaveLength(2)
    expect(itemsByOrderCPF[0]).toBeInstanceOf(Item)
    expect(itemsByOrderCPF[1]).toBeInstanceOf(Item)
  })
})
