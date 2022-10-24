import { Order } from '@/domain/entities'

export interface GetOrderByCodeRepository {
  getByCode: (code: string) => Promise<Order>
}
