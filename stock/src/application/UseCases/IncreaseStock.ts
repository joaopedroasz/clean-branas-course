import { StockCalculator, StockEntry } from '@/domain/models'
import { GetStockEntriesByItemIdRepository } from '@/domain/repositories'
import { IncreaseStock, IncreaseStockInput, IncreaseStockOutput } from '../contracts'

export class IncreaseStockUseCase implements IncreaseStock {
  private readonly getStockEntriesByItemIdRepository: GetStockEntriesByItemIdRepository

  constructor (getStockEntriesByItemIdRepository: GetStockEntriesByItemIdRepository) {
    this.getStockEntriesByItemIdRepository = getStockEntriesByItemIdRepository
  }

  public async execute ({ itemId, quantity }: IncreaseStockInput): Promise<IncreaseStockOutput> {
    const stockEntries = await this.getStockEntriesByItemIdRepository.getByItemId(itemId)
    const addingStock = new StockEntry({ itemId, quantity, operation: 'add' })
    new StockCalculator([...stockEntries, addingStock]).calculate()
    return {
      amountInStock: 0,
      itemId: ''
    }
  }
}
