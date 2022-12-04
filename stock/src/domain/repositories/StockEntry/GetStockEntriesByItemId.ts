import { StockEntry } from '@/domain/models'

export interface GetStockEntriesByItemId {
  getByItemId: (itemId: string) => Promise<StockEntry[]>
}
