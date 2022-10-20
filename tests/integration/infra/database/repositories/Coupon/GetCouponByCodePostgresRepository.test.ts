import { PrismaClient } from '@prisma/client'

import { CouponNotFoundError } from '@/domain/errors'
import { GetCouponByCodeRepository } from '@/domain/repositories/Coupon'
import { GetCouponByCodePostgresRepository } from '@/infra/database'

type SutTypes = {
  connection: PrismaClient
  sut: GetCouponByCodeRepository
}

const makeSut = (): SutTypes => {
  const connection = new PrismaClient()
  const sut = new GetCouponByCodePostgresRepository(connection)

  return {
    connection,
    sut
  }
}

describe('GetCouponByCodePostgresRepository', () => {
  beforeAll(async () => {
    const { connection } = makeSut()
    await connection.$connect()
    await connection.coupon.deleteMany()
  })

  afterAll(async () => {
    const { connection } = makeSut()
    await connection.$disconnect()
  })

  it('should return a coupon on success', async () => {
    const { sut, connection } = makeSut()
    const code = 'any_code'
    await connection.coupon.create({
      data: {
        code,
        percentage: 10
      }
    })

    const coupon = await sut.getByCode(code)

    expect(coupon).toBeDefined()
  })

  it('should throw CouponNotFoundError if coupon does not exist', async () => {
    const { sut } = makeSut()
    const code = 'invalid_code'

    const error = sut.getByCode(code)

    await expect(error).rejects.toThrowError(new CouponNotFoundError({
      targetProperty: 'code',
      targetValue: code
    }))
  })
})
