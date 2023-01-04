import { OrderPlaced } from '@/domain/event'
import { DecreaseStock } from '@/application/contracts'
import { Queue } from './Queue'

export class StockQueue {
  constructor (queue: Queue, decrementStock: DecreaseStock) {
    queue.consume('OrderPlaced', async ({ items }: OrderPlaced) => {
      await decrementStock.execute({
        itemId: items.id,
        decreaseQuantity: items.quantity
      })
    })
      .catch(console.error)
  }
}
