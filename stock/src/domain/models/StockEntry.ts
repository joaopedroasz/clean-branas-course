export type StockEntryOperation = 'add' | 'remove'

export type StockEntryProps = {
  id: string
  itemId: string
  quantity: number
  operation: StockEntryOperation
}

export class StockEntry {
  readonly id: string
  readonly itemId: string
  readonly quantity: number
  readonly operation: StockEntryOperation

  constructor ({
    id,
    itemId,
    operation,
    quantity
  }: StockEntryProps) {
    this.id = id
    this.itemId = itemId
    this.quantity = quantity
    this.operation = operation
  }
}
