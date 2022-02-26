import { ItemRepository } from '@/domain/repositories'
import { PlaceOrderUseCase } from '../contracts/use-cases'
import { PlaceOrderInput, PlaceOrderOutput } from '../DTO/PlaceOrder'

export class PlaceOrder implements PlaceOrderUseCase {
  private readonly itemRepository: ItemRepository

  constructor (itemRepository: ItemRepository) {
    this.itemRepository = itemRepository
  }

  async execute (input: PlaceOrderInput): Promise<PlaceOrderOutput> {
    let total = 0
    for (const orderItem of input.orderItems) {
      const item = await this.itemRepository.getById(orderItem.idItem)
      total += item.price
    }

    return {
      total
    }
  }
}
