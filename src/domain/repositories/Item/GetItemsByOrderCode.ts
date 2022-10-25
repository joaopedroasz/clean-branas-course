import { Item } from '@/domain/entities'

export interface GetItemsByOrderCodeRepository {
  getByOrderCode: (code: string) => Promise<Item[]>
}
