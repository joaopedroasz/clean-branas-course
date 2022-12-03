import { StockEntry } from './StockEntry'

export class StockCalculator {
  private readonly entries: StockEntry[]

  constructor (entries: StockEntry[]) {
    this.entries = entries
  }

  public calculate (): number {
    return this.entries.reduce((amount, entry) => entry.calculateAmount(amount), 0)
  }
}
