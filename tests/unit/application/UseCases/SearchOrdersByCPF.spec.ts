import { SearchOrdersByCPF } from '@/application/contracts'
import { SearchOrdersByCPFUseCase } from '@/application/UseCases'

type SutType = {
  sut: SearchOrdersByCPF
}

const makeSut = (): SutType => {
  const sut = new SearchOrdersByCPFUseCase()
  return {
    sut
  }
}

describe('SearchOrdersByCPF Use Case', () => {
  it('should return valid order', async () => {
    const { sut } = makeSut()
    const CPF = '737.978.953-80'

    const result = await sut.execute({ CPF })

    expect(result).toBeDefined()
  })
})
