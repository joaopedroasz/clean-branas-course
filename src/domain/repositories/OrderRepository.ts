import { Order } from '../entities'

export interface OrderRepository {
  save: (order: Order) => Promise<{ createdOrderId: string }>
}
