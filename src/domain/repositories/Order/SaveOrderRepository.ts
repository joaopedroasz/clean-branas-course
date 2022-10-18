import { Order } from '@/domain/entities'

export interface SaveOrderRepository {
  save: (order: Order) => Promise<Order>
}
