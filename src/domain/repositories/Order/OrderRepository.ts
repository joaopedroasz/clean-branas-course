import { Order } from '@/domain/entities'
import { SaveOrderInput, SaveOrderOutput } from './types'

export interface OrderRepository {
  save: (input: SaveOrderInput) => Promise<SaveOrderOutput>
  getByCode: (code: string) => Promise<Order>
}
