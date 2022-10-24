import { Order, OrderProps } from '@/domain/entities'
import { GetOrderByCodeRepository } from '@/domain/repositories/Order'
import { SearchOrderByCode } from '@/application/contracts'
import { SearchOrderByCodeUseCase } from '@/application/UseCases/SearchOrderByCode'

type SutType = {
  sut: SearchOrderByCode
  getOrderByCodeRepository: GetOrderByCodeRepository
}

const makeOrder = (props?: Partial<OrderProps>): Order => new Order({
  buyerCPF: '483.967.454-04',
  sequence: 1,
  purchaseDate: new Date('2022-10-24T15:30:00'),
  ...props
})

const makeGetOrderByCodeRepository = (): GetOrderByCodeRepository => ({
  async getByCode (code: string): Promise<Order> {
    return makeOrder()
  }
})

const makeSut = (): SutType => {
  const getOrderByCodeRepository = makeGetOrderByCodeRepository()
  const sut = new SearchOrderByCodeUseCase()

  return {
    sut,
    getOrderByCodeRepository
  }
}

describe('SearchOrderByCode UseCase', () => {
  it('should return an order by code', () => {
    const { sut, getOrderByCodeRepository } = makeSut()
    const orderCode = '202200000001'
    const order = makeOrder()
    vi.spyOn(getOrderByCodeRepository, 'getByCode').mockResolvedValueOnce(order)

    const result = sut.execute({ code: orderCode })

    expect(result).toBeDefined()
  })
})
