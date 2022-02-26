import { Item } from '../entities'

export interface ItemRepository {
  getById: (id: string) => Promise<Item>
}
