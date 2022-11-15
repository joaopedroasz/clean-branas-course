import { Order } from '@/domain/entities'

export interface GetOrdersByCPFRepository {
  getByCPF: (CPF: string) => Promise<Order[]>
}
