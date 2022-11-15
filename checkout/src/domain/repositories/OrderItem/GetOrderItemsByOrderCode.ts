import { OrderItem } from '@/domain/entities'

export interface GetOrderItemsByOrderCodeRepository {
  getByOrderCode: (orderCode: string) => Promise<OrderItem[]>
}
