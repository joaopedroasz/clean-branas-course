import { PrismaClient } from '@prisma/client'

import { Coupon } from '@/domain/entities'
import { CouponNotFoundError } from '@/domain/errors'
import { GetCouponByCodeRepository } from '@/domain/repositories/Coupon'

export class GetCouponByCodePrismaRepository implements GetCouponByCodeRepository {
  private readonly connection: PrismaClient

  constructor (connection: PrismaClient) {
    this.connection = connection
  }

  async getByCode (code: string): Promise<Coupon> {
    const coupon = await this.connection.coupon.findUnique({
      where: {
        code
      }
    })

    if (!coupon) {
      throw new CouponNotFoundError({
        targetProperty: 'code',
        targetValue: code
      })
    }

    const dueDate = coupon.expires_at ?? undefined

    return new Coupon({
      code: coupon.code,
      percentage: coupon.percentage,
      dueDate
    })
  }
}
