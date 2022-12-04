import { GetStockEntriesByItemId } from '@/domain/repositories'
import { DecreaseStock, DecreaseStockInput, DecreaseStockOutput } from '../contracts'
import { EmptyStockError } from '../errors'

export class DecreaseStockUseCase implements DecreaseStock {
  private readonly getStockEntriesByItemId: GetStockEntriesByItemId

  constructor (getStockEntriesByItemId: GetStockEntriesByItemId) {
    this.getStockEntriesByItemId = getStockEntriesByItemId
  }

  async execute ({ itemId }: DecreaseStockInput): Promise<DecreaseStockOutput> {
    const stockEntries = await this.getStockEntriesByItemId.getByItemId(itemId)

    if (!stockEntries.length) throw new EmptyStockError(itemId)

    return {
      amountInStock: 0,
      itemId: ''
    }
  }
}
