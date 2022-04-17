import { randomUUID } from 'crypto'

import { Coupon } from '@/domain/entities'
import { CouponRepository } from '@/domain/repositories'
import { CouponNotFoundError } from '@/domain/errors'

import { CouponRepositoryPostgres, DatabaseConnectionAdapter, DatabaseConnection } from '@/infra/database'
import { createCoupon, deleteCoupon } from './queries'

type makeSutTypes = {
  databaseConnection: DatabaseConnection
  couponRepository: CouponRepository
}

const makeSut = (): makeSutTypes => {
  const databaseConnection = new DatabaseConnectionAdapter()
  const couponRepository = new CouponRepositoryPostgres(databaseConnection)

  return {
    couponRepository,
    databaseConnection
  }
}

describe('Coupon postgres repository', () => {
  const { couponRepository, databaseConnection } = makeSut()

  test('should create a coupon repository', () => {
    expect(couponRepository).toBeDefined()
  })

  test('should get a Coupon', async () => {
    const couponId = randomUUID()
    await createCoupon(databaseConnection, couponId)

    const coupon = await couponRepository.getById(couponId)

    expect(coupon.getId()).toBeDefined()
    expect(coupon.getId()).toBe(couponId)

    await deleteCoupon(databaseConnection, couponId)
  })

  test('should throw an error when Coupon is not found', async () => {
    const invalidId = randomUUID()

    const invalidQuery = async (): Promise<Coupon> => await couponRepository.getById(invalidId)

    await expect(invalidQuery)
      .rejects.toThrowError(new CouponNotFoundError(invalidId))
  })
})
