import { Item } from '@/domain/entities'
import { GetItemsByIdsRepository } from '@/domain/repositories/Item'

export class ItemRepository implements GetItemsByIdsRepository {
  public readonly items: Item[] = []

  public async getByIds (ids: string[]): Promise<Item[]> {
    return this.items.filter(item => ids.includes(item.getId()))
  }
}
