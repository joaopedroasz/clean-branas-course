import { CouponNotFoundError } from '@/domain/errors'
import { GetCouponByCodeRepository } from '@/domain/repositories/Coupon'
import { GetCouponByCodePrismaRepository, connection } from '@/infra/database'

type SutTypes = {
  sut: GetCouponByCodeRepository
}

const makeSut = (): SutTypes => ({
  sut: new GetCouponByCodePrismaRepository(connection)
})

describe('GetCouponByCodePrismaRepository', () => {
  afterAll(async () => {
    const couponDeleteAll = connection.coupon.deleteMany()
    await connection.$transaction([couponDeleteAll])
  })

  it('should return a coupon on success', async () => {
    const { sut } = makeSut()
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
