import { UseCase } from './UseCase'
import { ValidateCouponInput } from '@/application/dtos/validate-coupon'

export interface ValidateCouponUseCase extends UseCase<ValidateCouponInput, boolean> {}
