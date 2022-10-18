import { ValidateCouponInputDTO, ValidateCouponOutputDTO } from '@/application/DTOs'
import { UseCase } from './UseCase'

export interface ValidateCoupon extends UseCase<ValidateCouponInputDTO, ValidateCouponOutputDTO> {}
