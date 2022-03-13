import { CouponRepository } from '@/domain/repositories'
import { CouponRepositoryPostgres, DatabaseConnectionAdapter, DatabaseConnection } from '@/infra/database'

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
  const { couponRepository } = makeSut()

  test('should create a coupon repository', () => {
    expect(couponRepository).toBeDefined()
  })
})
