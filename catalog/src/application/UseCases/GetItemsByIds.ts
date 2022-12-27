import { ItemRepository } from '@/domain/repositories/Item'
import { GetItemsByIds, GetItemsByIdsInput, GetItemsByIdsOutput } from '../contracts'

export class GetItemsByIdsUseCase implements GetItemsByIds {
  private readonly itemRepository: ItemRepository

  constructor (itemRepository: ItemRepository) {
    this.itemRepository = itemRepository
  }

  public async execute ({ ids }: GetItemsByIdsInput): Promise<GetItemsByIdsOutput> {
    const items = await this.itemRepository.getByIds(ids)
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
