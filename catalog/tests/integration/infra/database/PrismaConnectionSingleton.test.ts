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

  it('should return only one instance of PrismaClient', () => {
    const { sut } = makeSut()

    const client = sut.getClient()

    expect(client).toBe(sut.getClient())
  })

  it('should return same PrismaClient in different instances of PrismaConnectionSingleton', () => {
    const { sut } = makeSut()

    const client = sut.getClient()

    const sut2 = PrismaConnectionSingleton.getInstance()
    const client2 = sut2.getClient()

    expect(client).toBe(client2)
  })
})
