import { Order, OrderItem, OrderItemProps, OrderProps } from '@/domain/entities'
import { GetOrdersByCPFRepository } from '@/domain/repositories/Order'
import { GetOrderItemsByOrderCPFRepository } from '@/domain/repositories/OrderItem'
import { SearchOrdersByCPF } from '@/application/contracts'
import { SearchOrdersByCPFUseCase } from '@/application/UseCases'

const makeOrderItem = (props?: Partial<OrderItemProps>): OrderItem => new OrderItem({
  itemId: 'any_id',
  price: 1,
  quantity: 1,
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

const makeGetOrderItemsByOrderCPFRepository = (): GetOrderItemsByOrderCPFRepository => ({
  async getByOrderCPF (CPF: string): Promise<OrderItem[]> {
    return [makeOrderItem()]
  }
})

type SutType = {
  sut: SearchOrdersByCPF
  getOrdersByCPFRepository: GetOrdersByCPFRepository
  getOrderItemsByOrderCPFRepository: GetOrderItemsByOrderCPFRepository
}

const makeSut = (): SutType => {
  const getOrdersByCPFRepository = makeGetOrdersByCPFRepository()
  const getOrderItemsByOrderCPFRepository = makeGetOrderItemsByOrderCPFRepository()
  const sut = new SearchOrdersByCPFUseCase(
    getOrdersByCPFRepository,
    getOrderItemsByOrderCPFRepository
  )
  return {
    sut,
    getOrdersByCPFRepository,
    getOrderItemsByOrderCPFRepository
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

  it('should call GetOrderItemsByOrderCPFRepository with provided CPF', async () => {
    const { sut, getOrderItemsByOrderCPFRepository } = makeSut()
    const CPF = '737.978.953-80'
    const getOrderItemsByOrderCPFRepositorySpy = vi.spyOn(getOrderItemsByOrderCPFRepository, 'getByOrderCPF')

    await sut.execute({ CPF })

    expect(getOrderItemsByOrderCPFRepositorySpy).toHaveBeenCalledWith(CPF)
  })
})
