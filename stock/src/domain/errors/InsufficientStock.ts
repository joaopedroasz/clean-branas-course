export type InsufficientStockProps = {
  itemId: string
  removingQuantity: number
  amount: number
}

export class InsufficientStockError extends Error {
  constructor ({ itemId, removingQuantity, amount }: InsufficientStockProps) {
    super(`Insufficient stock for item ${itemId} to remove ${removingQuantity} from ${amount}`)
    this.name = 'InsufficientStockError'
  }
}
