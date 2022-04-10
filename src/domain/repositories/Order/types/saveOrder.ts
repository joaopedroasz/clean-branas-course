import { Order } from '@/domain/entities'

export type SaveOrderInput = {
  order: Order
}

export type SaveOrderOutput = {
  createdOrderId: string
  createdOrderCode: string
}
