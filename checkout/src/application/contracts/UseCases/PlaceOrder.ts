import { PlaceOrderInputDTO, PlaceOrderOutputDTO } from '@/application/DTOs'
import { UseCase } from './UseCase'

export interface PlaceOrder extends UseCase<PlaceOrderInputDTO, PlaceOrderOutputDTO> {}
