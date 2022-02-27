import { Order } from '../../entities'
import { SaveResponse } from './types/saveResponse'

export interface OrderRepository {
  save: (order: Order) => Promise<SaveResponse>
}
