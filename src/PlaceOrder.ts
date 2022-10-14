import { PlaceOrderInputDTO } from './PlaceOrderInput'
import { PlaceOrderOutputDTO } from './PlaceOrderOutput'
import { UseCase } from './UseCase'

export interface PlaceOrder extends UseCase<PlaceOrderInputDTO, PlaceOrderOutputDTO> {}
