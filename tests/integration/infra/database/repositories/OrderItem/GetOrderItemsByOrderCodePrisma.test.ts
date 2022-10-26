import { PrismaClient } from '@prisma/client'

import { Item, ItemProps, Order, OrderItem, OrderProps } from '@/domain/entities'
import { OrderItemNotFoundError } from '@/domain/errors'
import { GetOrderItemsByOrderCodeRepository } from '@/domain/repositories/OrderItem'
import { GetOrderItemsByOrderCodePrismaRepository } from '@/infra/database'

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
  buyerCPF: '805.827.925-09',
  purchaseDate: new Date('2022-10-17'),
  sequence: 0,
  ...props
})

type SutType = {
  sut: GetOrderItemsByOrderCodeRepository
  connection: PrismaClient
}

const connection = new PrismaClient()
const makeSut = (): SutType => {
  const sut = new GetOrderItemsByOrderCodePrismaRepository(connection)

  return { sut, connection }
}

describe('GetOrderItemsByOrderCodePrismaRepository', () => {
  afterAll(async () => {
    const { connection } = makeSut()
    const deleteOrderCode = connection.orderItem.deleteMany()
    const deleteItems = connection.item.deleteMany()
    const deleteOrder = connection.order.deleteMany()
    await connection.$transaction([deleteOrderCode, deleteItems, deleteOrder])
    await connection.$disconnect()
  })

  it('should return order items by order code', async () => {
    const { sut, connection } = makeSut()
    const item = makeItem()
    const createItem = connection.item.create({
      data: {
        id: item.getId(),
        description: item.getDescription(),
        price: item.getPrice(),
        depth: item.getDepth(),
        height: item.getHeight(),
        weight: item.getWeight(),
        width: item.getWidth()
      }
    })
    const order = makeOrder()
    const createOrder = connection.order.create({
      data: {
        code: order.getCode(),
        cpf: order.getCPF(),
        total: order.getTotalPrice(),
        issue_date: order.getPurchaseDate()
      }
    })
    const [createdOrder] = await connection.$transaction([createOrder, createItem])
    const orderItem = new OrderItem({
      itemId: item.getId(),
      price: item.getPrice(),
      quantity: 1
    })
    await connection.orderItem.create({
      data: {
        price: orderItem.calculatePrice(),
        quantity: orderItem.getQuantity(),
        item_id: orderItem.getItemId(),
        order_id: createdOrder.id
      }
    })

    const loadedOrderItem = await sut.getByOrderCode(order.getCode())

    expect(loadedOrderItem).toBeDefined()
    expect(loadedOrderItem[0]).toBeInstanceOf(OrderItem)
    expect(loadedOrderItem[0].getItemId()).toBe(orderItem.getItemId())
    expect(loadedOrderItem[0].getQuantity()).toBe(orderItem.getQuantity())
  })

  it('should throw if not found any order item', async () => {
    const { sut } = makeSut()
    const code = 'any_code'

    await expect(sut.getByOrderCode(code)).rejects.toThrowError(new OrderItemNotFoundError({
      targetProperty: 'order code',
      targetValue: code
    }))
  })
})
