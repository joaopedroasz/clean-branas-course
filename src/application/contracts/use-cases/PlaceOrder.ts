import { PlaceOrderInput, PlaceOrderOutput } from '../../dtos/place-order'
import { UseCase } from './UseCase'

export interface PlaceOrderUseCase extends UseCase<PlaceOrderInput, PlaceOrderOutput> {}
