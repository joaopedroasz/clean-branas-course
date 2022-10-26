import { Order, OrderProps } from '@/domain/entities'
import { GetOrdersByCPFRepository } from '@/domain/repositories/Order'
import { SearchOrdersByCPF } from '@/application/contracts'
import { SearchOrdersByCPFUseCase } from '@/application/UseCases'

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

type SutType = {
  sut: SearchOrdersByCPF
  getOrdersByCPFRepository: GetOrdersByCPFRepository
}

const makeSut = (): SutType => {
  const getOrdersByCPFRepository = makeGetOrdersByCPFRepository()
  const sut = new SearchOrdersByCPFUseCase(getOrdersByCPFRepository)
  return {
    sut,
    getOrdersByCPFRepository
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
})
