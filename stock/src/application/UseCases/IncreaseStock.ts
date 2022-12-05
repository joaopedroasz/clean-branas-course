import { GetStockEntriesByItemIdRepository } from '@/domain/repositories'
import { IncreaseStock, IncreaseStockInput, IncreaseStockOutput } from '../contracts'

export class IncreaseStockUseCase implements IncreaseStock {
  private readonly getStockEntriesByItemIdRepository: GetStockEntriesByItemIdRepository

  constructor (getStockEntriesByItemIdRepository: GetStockEntriesByItemIdRepository) {
    this.getStockEntriesByItemIdRepository = getStockEntriesByItemIdRepository
  }

  public async execute ({ itemId }: IncreaseStockInput): Promise<IncreaseStockOutput> {
    await this.getStockEntriesByItemIdRepository.getByItemId(itemId)
    return {
      amountInStock: 0,
      itemId: ''
    }
  }
}
