import { Item } from '@/domain/entities'

export interface ItemRepository {
  getById: (id: string) => Promise<Item>
}
