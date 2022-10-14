import { Coupon } from './Coupon'

export interface GetCouponByCodeRepository {
  getByCode: (code: string) => Promise<Coupon>
}
