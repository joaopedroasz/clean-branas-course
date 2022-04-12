import { UseCase } from './UseCase'
import { ValidateCouponInput } from '@/application/dtos'

export interface ValidateCouponUseCase extends UseCase<ValidateCouponInput, boolean> {}
