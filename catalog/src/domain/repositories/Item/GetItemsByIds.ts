import { Item } from '@/domain/entities'

export interface GetItemsByIdsRepository {
  getByIds: (ids: string[]) => Promise<Item[]>
}
