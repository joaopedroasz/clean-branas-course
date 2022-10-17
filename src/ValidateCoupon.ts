import { UseCase } from '@/UseCase'
import { ValidateCouponInputDTO } from './ValidateCouponInputDTO'
import { ValidateCouponOutputDTO } from './ValidateCouponOutputDTO'

export interface ValidateCoupon extends UseCase<ValidateCouponInputDTO, ValidateCouponOutputDTO> {}
