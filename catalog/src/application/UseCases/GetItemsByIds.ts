import { GetItemsByIdsRepository } from '@/domain/repositories/Item'
import { GetItemsByIds, GetItemsByIdsInput, GetItemsByIdsOutput } from '../contracts'

export class GetItemsByIdsUseCase implements GetItemsByIds {
  private readonly getItemsByIdsRepository: GetItemsByIdsRepository

  constructor (getItemsByIdsRepository: GetItemsByIdsRepository) {
    this.getItemsByIdsRepository = getItemsByIdsRepository
  }

  public async execute ({ ids }: GetItemsByIdsInput): Promise<GetItemsByIdsOutput> {
    await this.getItemsByIdsRepository.getByIds(ids)
    return {
      items: []
    }
  }
}
