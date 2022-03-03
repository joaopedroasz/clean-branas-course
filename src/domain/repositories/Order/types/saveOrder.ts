import { Order } from '@/domain/entities'

export type SaveOrderInput = {
  order: Order
  orderCode: string
}

export type SaveOrderOutput = {
  orderCode: string
}
