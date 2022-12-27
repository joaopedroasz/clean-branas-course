import { Item } from '@/domain/entities'

export interface ItemRepository {
  getByIds: (ids: string[]) => Promise<Item[]>
  save: (item: Item) => Promise<void>
}
