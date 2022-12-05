import { StockCalculator } from '@/domain/models'
import { GetStockEntriesByItemIdRepository } from '@/domain/repositories'
import { GetStock, GetStockInput, GetStockOutput } from '../contracts'

export class GetStockUseCase implements GetStock {
  private readonly getStockEntriesByItemIdRepository: GetStockEntriesByItemIdRepository

  constructor (getStockEntriesByItemIdRepository: GetStockEntriesByItemIdRepository) {
    this.getStockEntriesByItemIdRepository = getStockEntriesByItemIdRepository
  }

  public async execute ({ itemId }: GetStockInput): Promise<GetStockOutput> {
    const stockEntries = await this.getStockEntriesByItemIdRepository.getByItemId(itemId)
    const quantity = new StockCalculator(stockEntries).calculate()
    return { quantity }
  }
}
