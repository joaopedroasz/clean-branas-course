import { Item, ItemProps, Order, OrderProps } from '@/domain/entities'
import { ItemNotFoundError } from '@/domain/errors'
import { GetOrdersByCPFRepository } from '@/domain/repositories/Order'
import { GetItemsByOrderCPFRepository } from '@/domain/repositories/Item'
import { SearchOrdersByCPF } from '@/application/contracts'
import { SearchOrdersByCPFUseCase } from '@/application/UseCases'

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

const makeGetOrdersByCPFRepository = (): GetOrdersByCPFRepository => ({
  async getByCPF (CPF: string): Promise<Order[]> {
    return [makeOrder({ buyerCPF: CPF })]
  }
})

const makeGetItemsByOrderCPFRepository = (): GetItemsByOrderCPFRepository => ({
  async getByOrderCPF (orderCPF: string): Promise<Item[]> {
    return [makeItem()]
  }
})

type SutType = {
  sut: SearchOrdersByCPF
  getOrdersByCPFRepository: GetOrdersByCPFRepository
  getItemsByOrderCPFRepository: GetItemsByOrderCPFRepository
}

const makeSut = (): SutType => {
  const getOrdersByCPFRepository = makeGetOrdersByCPFRepository()
  const getItemsByOrderCPFRepository = makeGetItemsByOrderCPFRepository()
  const sut = new SearchOrdersByCPFUseCase(
    getOrdersByCPFRepository,
    getItemsByOrderCPFRepository
  )
  return {
    sut,
    getOrdersByCPFRepository,
    getItemsByOrderCPFRepository
  }
}

describe('SearchOrdersByCPF Use Case', () => {
  it('should return valid order', async () => {
    const { sut } = makeSut()
    const CPF = '737.978.953-80'

    const result = await sut.execute({ CPF })

    expect(result).toBeDefined()
    expect(result.orders).toBeInstanceOf(Array)
  })

  it('should call GetOrdersByCPFRepository with given CPF', async () => {
    const { sut, getOrdersByCPFRepository } = makeSut()
    const CPF = '737.978.953-80'
    const getOrdersByCPFRepositorySpy = vi.spyOn(getOrdersByCPFRepository, 'getByCPF')

    await sut.execute({ CPF })

    expect(getOrdersByCPFRepositorySpy).toBeCalledWith(CPF)
  })

  it('should return the same orders loaded by GetOrdersByCPFRepository', async () => {
    const { sut, getOrdersByCPFRepository } = makeSut()
    const CPF = '737.978.953-80'
    const sequence = 0
    const order = makeOrder({ buyerCPF: CPF, sequence })
    vi.spyOn(getOrdersByCPFRepository, 'getByCPF').mockResolvedValueOnce([order])

    const result = await sut.execute({ CPF })

    expect(result.orders[0].code).toBe('202200000001')
    expect(result.orders[0].CPF).toBe(order.getCPF())
    expect(result.orders[0].totalValue).toBe(order.getTotalPrice())
  })

  it('should return the same order items loaded by GetOrdersByCPFRepository', async () => {
    const { sut, getOrdersByCPFRepository } = makeSut()
    const CPF = '737.978.953-80'
    const item = makeItem()
    const order = makeOrder({ buyerCPF: CPF })
    order.addItem({
      item,
      quantity: 1
    })
    vi.spyOn(getOrdersByCPFRepository, 'getByCPF').mockResolvedValueOnce([order])

    const result = await sut.execute({ CPF })

    expect(result.orders[0].orderItems[0].quantity).toBe(order.getOrderItems()[0].getQuantity())
  })

  it('should call GetItemsByOrderCPFRepository with given CPF', async () => {
    const { sut, getItemsByOrderCPFRepository } = makeSut()
    const CPF = '737.978.953-80'
    const getOrdersByCPFRepositorySpy = vi.spyOn(getItemsByOrderCPFRepository, 'getByOrderCPF')

    await sut.execute({ CPF })

    expect(getOrdersByCPFRepositorySpy).toBeCalledWith(CPF)
  })

  it('should return the same items loaded by GetItemsByOrderCPFRepository', async () => {
    const { sut, getItemsByOrderCPFRepository, getOrdersByCPFRepository } = makeSut()
    const CPF = '737.978.953-80'
    const item = makeItem()
    const order = makeOrder({ buyerCPF: CPF })
    order.addItem({
      item,
      quantity: 1
    })
    vi.spyOn(getItemsByOrderCPFRepository, 'getByOrderCPF').mockResolvedValueOnce([item])
    vi.spyOn(getOrdersByCPFRepository, 'getByCPF').mockResolvedValueOnce([order])

    const result = await sut.execute({ CPF })

    expect(result.orders[0].orderItems[0].item.id).toBe(item.getId())
  })

  it('should throw ItemNotFoundError if GetOrdersByCPFRepository returns a order with some item that does not exists', async () => {
    const { sut, getOrdersByCPFRepository } = makeSut()
    const CPF = '737.978.953-80'
    const item = makeItem({ id: 'invalid_id' })
    const order = makeOrder({ buyerCPF: CPF })
    order.addItem({
      item,
      quantity: 1
    })
    vi.spyOn(getOrdersByCPFRepository, 'getByCPF').mockResolvedValueOnce([order])

    const promise = sut.execute({ CPF })

    await expect(promise).rejects.toThrowError(new ItemNotFoundError({
      targetProperty: 'id',
      targetValue: item.getId()
    }))
  })
})
