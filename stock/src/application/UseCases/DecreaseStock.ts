import { StockCalculator, StockEntry } from '@/domain/models'
import { GetStockEntriesByItemIdRepository, SaveStockEntryRepository } from '@/domain/repositories'
import { DecreaseStock, DecreaseStockInput, DecreaseStockOutput } from '../contracts'
import { EmptyStockError } from '../errors'

export class DecreaseStockUseCase implements DecreaseStock {
  private readonly getStockEntriesByItemIdRepository: GetStockEntriesByItemIdRepository
  private readonly saveStockEntryRepository: SaveStockEntryRepository

  constructor (
    getStockEntriesByItemIdRepository: GetStockEntriesByItemIdRepository,
    saveStockEntryRepository: SaveStockEntryRepository
  ) {
    this.getStockEntriesByItemIdRepository = getStockEntriesByItemIdRepository
    this.saveStockEntryRepository = saveStockEntryRepository
  }

  async execute ({ itemId, decreaseQuantity }: DecreaseStockInput): Promise<DecreaseStockOutput> {
    const stockEntries = await this.getStockEntriesByItemIdRepository.getByItemId(itemId)
    if (!stockEntries.length) throw new EmptyStockError(itemId)
    const removingStockEntry = new StockEntry({ itemId, quantity: decreaseQuantity, operation: 'remove' })
    const amountInStock = new StockCalculator([...stockEntries, removingStockEntry]).calculate()
    await this.saveStockEntryRepository.save(removingStockEntry)

    return { amountInStock, itemId }
  }
}
