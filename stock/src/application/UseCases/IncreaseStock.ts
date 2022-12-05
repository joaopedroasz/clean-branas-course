import { StockCalculator, StockEntry } from '@/domain/models'
import { GetStockEntriesByItemIdRepository, SaveStockEntryRepository } from '@/domain/repositories'
import { IncreaseStock, IncreaseStockInput, IncreaseStockOutput } from '../contracts'

export class IncreaseStockUseCase implements IncreaseStock {
  private readonly getStockEntriesByItemIdRepository: GetStockEntriesByItemIdRepository
  private readonly saveStockEntryRepository: SaveStockEntryRepository

  constructor (
    getStockEntriesByItemIdRepository: GetStockEntriesByItemIdRepository,
    saveStockEntryRepository: SaveStockEntryRepository
  ) {
    this.getStockEntriesByItemIdRepository = getStockEntriesByItemIdRepository
    this.saveStockEntryRepository = saveStockEntryRepository
  }

  public async execute ({ itemId, quantity }: IncreaseStockInput): Promise<IncreaseStockOutput> {
    const stockEntries = await this.getStockEntriesByItemIdRepository.getByItemId(itemId)
    const addingStock = new StockEntry({ itemId, quantity, operation: 'add' })
    new StockCalculator([...stockEntries, addingStock]).calculate()
    await this.saveStockEntryRepository.save(addingStock)
    return {
      amountInStock: 0,
      itemId: ''
    }
  }
}
