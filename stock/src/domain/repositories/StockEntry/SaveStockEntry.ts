import { StockEntry } from '@/domain/models'

export interface SaveStockEntryRepository {
  save: (stockEntry: StockEntry) => Promise<StockEntry>
}
