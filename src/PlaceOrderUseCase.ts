import { PlaceOrder } from './PlaceOrder'
import { PlaceOrderInputDTO } from './PlaceOrderInput'
import { PlaceOrderOutputDTO } from './PlaceOrderOutput'

export class PlaceOrderUseCase implements PlaceOrder {
  public async execute (input: PlaceOrderInputDTO): Promise<PlaceOrderOutputDTO> {
    return {
      order: 100,
      couponDiscount: 0,
      total: 100
    }
  }
}
