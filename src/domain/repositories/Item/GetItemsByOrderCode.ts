import { Item } from '@/domain/entities'

export interface GetItemsByOrderCodeRepository {
  getByCode: (code: string) => Promise<Item[]>
}
