import { Item } from './Item'

export interface GetItemByIdRepository {
  getById: (id: string) => Promise<Item>
}
