import { Item } from '@/domain/entities'
import { GetItemsByIdsRepository } from '@/domain/repositories/Item'

export class GetItemsByIdsInMemoryRepository implements GetItemsByIdsRepository {
  public readonly items: Item[] = []

  public async getByIds (ids: string[]): Promise<Item[]> {
    return this.items.filter(item => ids.includes(item.getId()))
  }

  public async save (item: Item): Promise<void> {
    this.items.push(item)
  }
}
