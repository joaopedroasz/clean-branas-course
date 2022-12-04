import { StockCalculator, StockEntry } from '@/domain/models'
import { GetStockEntriesByItemIdRepository } from '@/domain/repositories'
import { DecreaseStock, DecreaseStockInput, DecreaseStockOutput } from '../contracts'
import { EmptyStockError } from '../errors'

export class DecreaseStockUseCase implements DecreaseStock {
  private readonly getStockEntriesByItemIdRepository: GetStockEntriesByItemIdRepository

  constructor (getStockEntriesByItemIdRepository: GetStockEntriesByItemIdRepository) {
    this.getStockEntriesByItemIdRepository = getStockEntriesByItemIdRepository
  }

  async execute ({ itemId, decreaseQuantity }: DecreaseStockInput): Promise<DecreaseStockOutput> {
    const stockEntries = await this.getStockEntriesByItemIdRepository.getByItemId(itemId)
    if (!stockEntries.length) throw new EmptyStockError(itemId)
    const removingStockEntry = new StockEntry({ itemId, quantity: decreaseQuantity, operation: 'remove' })
    new StockCalculator([...stockEntries, removingStockEntry]).calculate()

    return {
      amountInStock: 0,
      itemId: ''
    }
  }
}
