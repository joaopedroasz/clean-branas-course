import { PlaceOrderInput, PlaceOrderOutput } from '../../dtos'
import { UseCase } from './UseCase'

export interface PlaceOrderUseCase extends UseCase<PlaceOrderInput, PlaceOrderOutput> {}
