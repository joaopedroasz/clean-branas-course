import { PlaceOrderInput, PlaceOrderOutput } from '../../DTO/PlaceOrder'
import { UseCase } from './UseCase'

export interface PlaceOrderUseCase extends UseCase<PlaceOrderInput, PlaceOrderOutput> {}
