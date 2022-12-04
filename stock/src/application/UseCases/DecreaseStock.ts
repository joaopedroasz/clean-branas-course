import { GetStockEntriesByItemId } from '@/domain/repositories'
import { DecreaseStock, DecreaseStockInput, DecreaseStockOutput } from '../contracts'

export class DecreaseStockUseCase implements DecreaseStock {
  private readonly getStockEntriesByItemId: GetStockEntriesByItemId

  constructor (getStockEntriesByItemId: GetStockEntriesByItemId) {
    this.getStockEntriesByItemId = getStockEntriesByItemId
  }

  async execute ({ itemId }: DecreaseStockInput): Promise<DecreaseStockOutput> {
    await this.getStockEntriesByItemId.getByItemId(itemId)
    return {
      amountInStock: 0,
      itemId: ''
    }
  }
}
