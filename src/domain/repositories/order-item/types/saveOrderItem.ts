import { OrderItem } from '@/domain/entities'

export type SaveOrderItemInput = {
  orderId: string
  orderItem: OrderItem
}

export type SaveOrderItemOutput = {
  createdOrderItemId: string
}
