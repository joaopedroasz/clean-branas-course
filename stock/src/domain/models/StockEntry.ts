import { InvalidQuantityError } from '../errors'

export type StockEntryOperation = 'add' | 'remove'

export type StockEntryProps = {
  id: string
  itemId: string
  quantity: number
  operation: StockEntryOperation
}

export class StockEntry {
  private readonly id: string
  private readonly itemId: string
  private readonly quantity: number
  private readonly operation: StockEntryOperation

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

    if (!this.isValidNumber(quantity)) throw new InvalidQuantityError(quantity)
  }

  private isValidNumber (value: number): boolean {
    return value > 0
  }
}
