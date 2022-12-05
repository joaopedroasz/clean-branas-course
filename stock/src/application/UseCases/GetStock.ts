import { GetStockEntriesByItemIdRepository } from '@/domain/repositories'
import { GetStock, GetStockInput, GetStockOutput } from '../contracts'

export class GetStockUseCase implements GetStock {
  private readonly getStockEntriesByItemIdRepository: GetStockEntriesByItemIdRepository

  constructor (getStockEntriesByItemIdRepository: GetStockEntriesByItemIdRepository) {
    this.getStockEntriesByItemIdRepository = getStockEntriesByItemIdRepository
  }

  public async execute ({ itemId }: GetStockInput): Promise<GetStockOutput> {
    await this.getStockEntriesByItemIdRepository.getByItemId(itemId)
    return { quantity: 0 }
  }
}
