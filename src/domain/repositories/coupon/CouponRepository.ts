import { Coupon } from '@/domain/entities'

export interface CouponRepository {
  getById: (id: string) => Promise<Coupon>
}
