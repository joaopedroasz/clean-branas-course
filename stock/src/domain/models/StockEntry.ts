import { InsufficientStockError, InvalidQuantityError } from '../errors'

export type StockEntryOperation = 'add' | 'remove'

export type StockEntryProps = {
  id?: string
  itemId: string
  quantity: number
  operation: StockEntryOperation
}

export class StockEntry {
  private readonly id?: string
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

  public getId (): string | undefined {
    return this.id
  }

  public getItemId (): string {
    return this.itemId
  }

  public getQuantity (): number {
    return this.quantity
  }

  public getOperation (): StockEntryOperation {
    return this.operation
  }

  private isValidNumber (value: number): boolean {
    return value > 0
  }

  public isIncrease (): boolean {
    return this.operation === 'add'
  }

  public isDecrease (): boolean {
    return this.operation === 'remove'
  }

  public calculateAmount (amount: number): number {
    if (this.isIncrease()) return amount + this.quantity
    if (!this.canDecrease(amount)) {
      throw new InsufficientStockError({
        itemId: this.itemId,
        removingQuantity: this.quantity,
        amount
      })
    }
    return amount - this.quantity
  }

  private canDecrease (amount: number): boolean {
    return this.quantity <= amount
  }
}
