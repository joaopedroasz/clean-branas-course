import { ItemNotFoundError } from '@/domain/errors'
import { Item, ItemProps, Order, OrderProps } from '@/domain/entities'
import { GetItemsByOrderCPFRepository } from '@/domain/repositories/Item'
import { GetItemsByOrderCPFPrismaRepository, connection } from '@/infra/database'
import { deleteAll } from '@/tests/utils'

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
}

const makeSut = (): SutType => ({
  sut: new GetItemsByOrderCPFPrismaRepository(connection)
})

describe('GetItemsByOrderCPFPrismaRepository', () => {
  afterAll(async () => {
    await deleteAll(connection)
  })

  it('should return items by order CPF', async () => {
    const { sut } = makeSut()
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

  it('should throw ItemNotFoundError if no items are found', async () => {
    const { sut } = makeSut()

    const promise = sut.getByOrderCPF('any_cpf')

    await expect(promise).rejects.toThrowError(new ItemNotFoundError({
      targetProperty: 'order CPF',
      targetValue: 'any_cpf'
    }))
  })
})
