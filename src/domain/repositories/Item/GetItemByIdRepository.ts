import { Item } from '@/domain/entities'

export interface GetItemByIdRepository {
  getById: (id: string) => Promise<Item>
}
