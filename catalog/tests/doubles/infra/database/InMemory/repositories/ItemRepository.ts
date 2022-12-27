import { Item } from '@/domain/entities'
import { ItemRepository } from '@/domain/repositories/Item'

export class ItemInMemoryRepository implements ItemRepository {
  public readonly items: Item[] = []

  public async getByIds (ids: string[]): Promise<Item[]> {
    return this.items.filter(item => ids.includes(item.getId()))
  }

  public async save (item: Item): Promise<void> {
    this.items.push(item)
  }
}
