import { Coupon } from '@/domain/entities'
import { CouponRepository } from '@/domain/repositories'
import { DatabaseConnection, CouponTable } from '@/infra/database'

export class CouponRepositoryPostgres implements CouponRepository {
  private readonly databaseConnection: DatabaseConnection

  constructor (databaseConnection: DatabaseConnection) {
    this.databaseConnection = databaseConnection
  }

  public async getById (id: string): Promise<Coupon> {
    const [couponFromDatabase] = await this.databaseConnection.query<string[], CouponTable[]>(
      'SELECT * FROM coupons where id = $1',
      [id]
    )

    const {
      id: couponId,
      code,
      expired_date: expiredDate,
      percentage
    } = couponFromDatabase

    const coupon = new Coupon({
      id: couponId,
      code,
      expiresIn: expiredDate,
      percentage
    })

    return coupon
  }
}
