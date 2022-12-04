import { StockEntry } from '@/domain/models'

export interface GetStockEntriesByItemIdRepository {
  getByItemId: (itemId: string) => Promise<StockEntry[]>
}
