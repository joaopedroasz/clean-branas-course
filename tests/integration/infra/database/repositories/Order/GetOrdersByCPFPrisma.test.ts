import { PrismaClient } from '@prisma/client'

import { Item, ItemProps, Order, OrderProps } from '@/domain/entities'
import { GetOrdersByCPFRepository } from '@/domain/repositories/Order'
import { GetOrdersByCPFPrismaRepository, PrismaClientSingleton } from '@/infra/database'
import { deleteAll } from '../../deleteAll'

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
  sut: GetOrdersByCPFRepository
  connection: PrismaClient
}

const connection = PrismaClientSingleton.getInstance()
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
    await deleteAll(connection)
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

  it('should return order with order items', async () => {
    const { sut } = makeSut()
    const CPF = '412.988.031-44'
    const orders: Order[] = [makeOrder({ buyerCPF: CPF, sequence: 2 }), makeOrder({ buyerCPF: CPF, sequence: 3 })]
    await connection.order.createMany({
      data: orders.map(order => ({
        cpf: order.getCPF(),
        code: order.getCode(),
        total: order.getTotalPrice(),
        issue_date: order.getPurchaseDate()
      }))
    })
    const itemsIds: string[] = ['first_id', 'second_id']
    const items: Item[] = itemsIds.map(id => makeItem({ id }))
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
    const createdOrders = await connection.order.findMany({
      where: {
        cpf: CPF
      }
    })
    orders.forEach((order, index) => {
      order.addItem({
        item: items[index],
        quantity: 1
      })
    })
    await connection.orderItem.createMany({
      data: orders.flatMap(order => {
        return order.getOrderItems().map(orderItem => ({
          order_id: createdOrders.filter(createdOrder => createdOrder.code === order.getCode())[0].id,
          item_id: orderItem.getItemId(),
          quantity: orderItem.getQuantity(),
          price: orderItem.calculatePrice()
        }))
      })
    })

    const result = await sut.getByCPF(CPF)

    expect(result).toBeDefined()
    expect(result).toBeInstanceOf(Array)
    expect(result).toHaveLength(2)

    expect(result[0].getOrderItems()).toBeDefined()
    expect(result[0].getOrderItems()).toBeInstanceOf(Array)
    expect(result[0].getOrderItems()).toHaveLength(1)
    expect(result[0].getOrderItems()[0].getItemId()).toBe(items[0].getId())

    expect(result[1].getOrderItems()).toBeDefined()
    expect(result[1].getOrderItems()).toBeInstanceOf(Array)
    expect(result[1].getOrderItems()).toHaveLength(1)
    expect(result[1].getOrderItems()[0].getItemId()).toBe(items[1].getId())
  })
})
