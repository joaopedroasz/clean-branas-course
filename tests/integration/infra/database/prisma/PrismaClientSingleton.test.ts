import { PrismaClient } from '@prisma/client'

import { PrismaClientSingleton } from '@/infra/database/prisma'

describe('PrismaClientSingleton', () => {
  let sut: PrismaClient

  beforeAll(async () => {
    sut = PrismaClientSingleton.getInstance()
  })

  afterAll(async () => {
    await sut.$disconnect()
  })

  it('should be a singleton', () => {
    expect(sut).toBe(PrismaClientSingleton.getInstance())
  })
})
