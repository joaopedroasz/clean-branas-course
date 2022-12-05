import { PrismaConnectionSingleton } from '@/infra/database'

type SutType = {
  sut: PrismaConnectionSingleton
}

const makeSut = (): SutType => ({
  sut: PrismaConnectionSingleton.getInstance()
})

describe('PrismaConnectionSingleton', () => {
  it('should be a singleton', () => {
    const { sut } = makeSut()

    expect(sut).toBe(PrismaConnectionSingleton.getInstance())
  })
})
