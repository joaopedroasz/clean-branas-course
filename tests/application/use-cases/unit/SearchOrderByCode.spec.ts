import { OrderRepository } from '@/domain/repositories'

import { SearchOrderByCodeUseCase } from '@/application/contracts'
import { SearchOrderByCode } from '@/application/use-cases'
import { OrderRepositoryStub } from '@/tests/stub/repositories'

type makeSutType = {
  orderRepository: OrderRepository
  searchOrderByCode: SearchOrderByCodeUseCase
}

const makeSut = (): makeSutType => {
  const orderRepository = new OrderRepositoryStub()
  const searchOrderByCode = new SearchOrderByCode(orderRepository)

  return {
    searchOrderByCode,
    orderRepository
  }
}

describe('Search Order By Code use case', () => {
  const validCode = 'valid_code'

  test('should create a instance of use case', () => {
    const { searchOrderByCode } = makeSut()

    expect(searchOrderByCode).toBeDefined()
    expect(searchOrderByCode).toHaveProperty('execute')
  })

  test('should search a order by code', async () => {
    const { searchOrderByCode } = makeSut()

    const order = await searchOrderByCode.execute({
      orderCode: validCode
    })

    expect(order).toHaveProperty('orderCode')
    expect(order.orderCode).toBe(validCode)
  })

  test('should calls orderRepository with correct parameters', async () => {
    const { searchOrderByCode, orderRepository } = makeSut()
    const orderItemRepositorySpy = jest.spyOn(orderRepository, 'getByCode')

    await searchOrderByCode.execute({ orderCode: validCode })

    expect(orderItemRepositorySpy).toHaveBeenCalled()
    expect(orderItemRepositorySpy).toHaveBeenCalledTimes(1)
    expect(orderItemRepositorySpy).toHaveBeenCalledWith(validCode)
  })
})
