import { SearchOrderByCodeUseCase } from '@/application/contracts'
import { SearchOrderByCode } from '@/application/use-cases'

type makeSutType = {
  searchOrderByCode: SearchOrderByCodeUseCase
}

const makeSut = (): makeSutType => {
  const searchOrderByCode = new SearchOrderByCode()

  return {
    searchOrderByCode
  }
}

describe('Search Order By Code use case', () => {
  test('should create a instance of use case', () => {
    const { searchOrderByCode } = makeSut()

    expect(searchOrderByCode).toBeDefined()
    expect(searchOrderByCode).toHaveProperty('execute')
  })
})
