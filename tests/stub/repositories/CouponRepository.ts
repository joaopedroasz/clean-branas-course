import { Coupon } from '@/domain/entities'
import { CouponRepository } from '@/domain/repositories'

export class CouponRepositoryStub implements CouponRepository {
  public async getById (id: string): Promise<Coupon> {
    return new Coupon({
      id,
      code: 'codigo_de_cupom_valido',
      percentage: 10,
      currentDate: new Date('03/12/2022'),
      expiresIn: new Date('03/13/2022')
    })
  }
}
