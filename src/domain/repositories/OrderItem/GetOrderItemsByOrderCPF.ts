import { OrderItem } from '@/domain/entities'

export interface GetOrderItemsByOrderCPFRepository {
  getByOrderCPF: (CPF: string) => Promise<OrderItem[]>
}
