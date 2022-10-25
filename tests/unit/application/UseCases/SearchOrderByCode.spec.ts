import { Item, ItemProps, Order, OrderItem, OrderItemProps, OrderProps } from '@/domain/entities'
import { ItemNotFoundError } from '@/domain/errors'
import { GetOrderByCodeRepository } from '@/domain/repositories/Order'
import { GetItemsByOrderCodeRepository } from '@/domain/repositories/Item'
import { GetOrderItemsByOrderCodeRepository } from '@/domain/repositories/OrderItem'
import { SearchOrderByCode } from '@/application/contracts'
import { SearchOrderByCodeUseCase } from '@/application/UseCases/SearchOrderByCode'

type SutType = {
  sut: SearchOrderByCode
  getOrderByCodeRepository: GetOrderByCodeRepository
  getItemsByOrderCodeRepository: GetItemsByOrderCodeRepository
  getOrderItemsByOrderCodeRepository: GetOrderItemsByOrderCodeRepository
}

const makeOrder = (props?: Partial<OrderProps>): Order => new Order({
  buyerCPF: '483.967.454-04',
  sequence: 1,
  purchaseDate: new Date('2022-10-24T15:30:00'),
  ...props
})

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

const makeOrderItem = (props?: Partial<OrderItemProps>): OrderItem => new OrderItem({
  itemId: 'any_id',
  price: 1,
  quantity: 1,
  ...props
})

const makeGetOrderItemsByOrderCodeRepository = (): GetOrderItemsByOrderCodeRepository => ({
  async getByOrderCode (code: string): Promise<OrderItem[]> {
    return [makeOrderItem()]
  }
})

const makeGetItemsByOrderCodeRepository = (): GetItemsByOrderCodeRepository => ({
  async getByCode (code: string): Promise<Item[]> {
    return [makeItem()]
  }
})

const makeGetOrderByCodeRepository = (): GetOrderByCodeRepository => ({
  async getByCode (code: string): Promise<Order> {
    return makeOrder()
  }
})

const makeSut = (): SutType => {
  const getOrderByCodeRepository = makeGetOrderByCodeRepository()
  const getItemsByOrderCodeRepository = makeGetItemsByOrderCodeRepository()
  const getOrderItemsByOrderCodeRepository = makeGetOrderItemsByOrderCodeRepository()
  const sut = new SearchOrderByCodeUseCase(
    getOrderByCodeRepository,
    getItemsByOrderCodeRepository,
    getOrderItemsByOrderCodeRepository
  )

  return {
    sut,
    getOrderByCodeRepository,
    getItemsByOrderCodeRepository,
    getOrderItemsByOrderCodeRepository
  }
}

describe('SearchOrderByCode UseCase', () => {
  it('should return an order by code', async () => {
    const { sut, getOrderByCodeRepository } = makeSut()
    const orderCode = '202200000001'
    const order = makeOrder()
    vi.spyOn(getOrderByCodeRepository, 'getByCode').mockResolvedValueOnce(order)

    const result = await sut.execute({ code: orderCode })

    expect(result).toBeDefined()
  })

  it('should call GetOrderByCodeRepository correctly', async () => {
    const { sut, getOrderByCodeRepository } = makeSut()
    const orderCode = '202200000001'
    const order = makeOrder()
    const getByCodeSpy = vi.spyOn(getOrderByCodeRepository, 'getByCode').mockResolvedValueOnce(order)

    await sut.execute({ code: orderCode })

    expect(getByCodeSpy).toHaveBeenCalledWith(orderCode)
  })

  it('should return same order loaded by GetOrderByCodeRepository', async () => {
    const { sut, getOrderByCodeRepository } = makeSut()
    const orderCode = '202200000002'
    const order = makeOrder({ sequence: 1 })
    vi.spyOn(getOrderByCodeRepository, 'getByCode').mockResolvedValueOnce(order)

    const result = await sut.execute({ code: orderCode })

    expect(result).toMatchObject({
      code: order.getCode(),
      CPF: order.getCPF(),
      purchaseDate: order.getPurchaseDate(),
      total: order.getTotalPrice()
    })
  })

  it('should call GetItemsByOrderCodeRepository correctly', async () => {
    const { sut, getItemsByOrderCodeRepository, getOrderItemsByOrderCodeRepository } = makeSut()
    const orderCode = '202200000003'
    const itemsIds = ['1', '2', '3']
    const items: Item[] = itemsIds.map(id => makeItem({ id }))
    const getItemsByOrderCodeRepositorySpy = vi.spyOn(getItemsByOrderCodeRepository, 'getByCode').mockResolvedValueOnce(items)
    const orderItems = itemsIds.map(id => makeOrderItem({ itemId: id }))
    vi.spyOn(getOrderItemsByOrderCodeRepository, 'getByOrderCode').mockResolvedValueOnce(orderItems)

    await sut.execute({ code: orderCode })

    expect(getItemsByOrderCodeRepositorySpy).toHaveBeenCalledWith(orderCode)
  })

  it('should return same order items loaded by GetOrderItemsByOrderCodeRepository and GetItemsByOrderCodeRepository', async () => {
    const { sut, getItemsByOrderCodeRepository, getOrderItemsByOrderCodeRepository } = makeSut()
    const orderCode = '202200000004'
    const itemsIds = ['1', '2', '3']
    const items: Item[] = itemsIds.map(id => makeItem({ id }))
    vi.spyOn(getItemsByOrderCodeRepository, 'getByCode').mockResolvedValueOnce(items)
    const orderItems = itemsIds.map(id => makeOrderItem({ itemId: id }))
    vi.spyOn(getOrderItemsByOrderCodeRepository, 'getByOrderCode').mockResolvedValueOnce(orderItems)

    const result = await sut.execute({ code: orderCode })

    expect(result.orderItems).toMatchObject(
      orderItems.map(orderItem => {
        const item = items.find(item => item.getId() === orderItem.getItemId())
        return {
          quantity: orderItem.getQuantity(),
          item: {
            id: item?.getId(),
            description: item?.getDescription(),
            price: item?.getPrice(),
            weight: item?.getWeight(),
            width: item?.getWidth(),
            height: item?.getHeight(),
            depth: item?.getDepth()
          }
        }
      })
    )
  })

  it('should throw ItemNotFoundError if GetOrderItemsByOrderCodeRepository has an item id that not exists', async () => {
    const { sut, getOrderItemsByOrderCodeRepository, getItemsByOrderCodeRepository } = makeSut()
    const orderCode = '202200000005'
    const items: Item[] = [makeItem({ id: '1' }), makeItem({ id: '2' }), makeItem({ id: '3' })]
    vi.spyOn(getItemsByOrderCodeRepository, 'getByCode').mockResolvedValueOnce(items)
    const orderItems = [makeOrderItem({ itemId: '4' })]
    vi.spyOn(getOrderItemsByOrderCodeRepository, 'getByOrderCode').mockResolvedValueOnce(orderItems)

    const promise = sut.execute({ code: orderCode })

    await expect(promise).rejects.toThrow(new ItemNotFoundError({
      targetProperty: 'id',
      targetValue: '4'
    }))
  })
})
