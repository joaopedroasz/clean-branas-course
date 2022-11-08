import { PrismaClientSingleton } from '@/infra/database/prisma'

type SutType = {
  sut: PrismaClientSingleton
}

const makeSut = (): SutType => {
  const sut = PrismaClientSingleton.getInstance()
  return {
    sut
  }
}

describe('PrismaClientSingleton', () => {
  it('should be a singleton', () => {
    const { sut } = makeSut()
    expect(sut).toBe(PrismaClientSingleton.getInstance())
  })
})
