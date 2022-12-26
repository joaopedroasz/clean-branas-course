import { GetItemsByIdsRepository } from '@/domain/repositories/Item'
import { GetItemsByIds, GetItemsByIdsInput, GetItemsByIdsOutput } from '../contracts'

export class GetItemsByIdsUseCase implements GetItemsByIds {
  private readonly getItemsByIdsRepository: GetItemsByIdsRepository

  constructor (getItemsByIdsRepository: GetItemsByIdsRepository) {
    this.getItemsByIdsRepository = getItemsByIdsRepository
  }

  public async execute ({ ids }: GetItemsByIdsInput): Promise<GetItemsByIdsOutput> {
    const items = await this.getItemsByIdsRepository.getByIds(ids)
    return {
      items: items.map(item => ({
        id: item.getId(),
        depth: item.getDepth(),
        description: item.getDescription(),
        height: item.getHeight(),
        price: item.getPrice(),
        weight: item.getWeight(),
        width: item.getWidth()
      }))
    }
  }
}
