import { randomUUID } from 'crypto'

import { Coupon } from '@/domain/entities'
import { CouponRepository } from '@/domain/repositories'
import { CouponRepositoryPostgres, DatabaseConnectionAdapter, DatabaseConnection } from '@/infra/database'
import { CouponNotFoundError } from '@/domain/errors'

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
    await databaseConnection.query<object, null>(
      `
        INSERT INTO coupons (
          id,
          code,
          percentage,
          expire_date
        ) VALUES (
          $<id>,
          $<code>,
          $<percentage>,
          $<expire_date>
        )
      `,
      {
        id: couponId,
        code: 'random_code',
        percentage: 10,
        expire_date: new Date('03/13/2022')
      }
    )

    const coupon = await couponRepository.getById(couponId)

    expect(coupon.id).toBeDefined()
    expect(coupon.id).toBe(couponId)

    await databaseConnection.query<object, null>(
      `
        DELETE FROM coupons
        WHERE id = $<id>
      `,
      {
        id: couponId
      }
    )
  })

  test('should throw an error when Coupon is not found', async () => {
    const invalidId = randomUUID()

    const invalidQuery = async (): Promise<Coupon> => await couponRepository.getById(invalidId)

    await expect(invalidQuery)
      .rejects.toThrowError(new CouponNotFoundError(invalidId))
  })
})
