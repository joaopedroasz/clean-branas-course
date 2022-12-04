export class EmptyStockError extends Error {
  constructor (itemId: string) {
    super(`There is no stock for item ${itemId}`)
  }
}
