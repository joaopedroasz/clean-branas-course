import { Coupon } from '@/domain/entities'

export interface GetCouponByCodeRepository {
  getByCode: (code: string) => Promise<Coupon>
}
