import { Item } from '@/domain/entities'

export interface GetItemsByOrderCPFRepository {
  getByOrderCPF: (orderCPF: string) => Promise<Item[]>
}
