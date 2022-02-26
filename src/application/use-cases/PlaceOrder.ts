import { PlaceOrderUseCase } from '../contracts/use-cases'
import { PlaceOrderInput, PlaceOrderOutput } from '../DTO/PlaceOrder'

export class PlaceOrder implements PlaceOrderUseCase {
  async execute (input: PlaceOrderInput): Promise<PlaceOrderOutput> {
    return {
      total: 10
    }
  }
}
