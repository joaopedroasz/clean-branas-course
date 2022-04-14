import { SaveOrderItemInput, SaveOrderItemOutput } from './types'

export interface OrderItemRepository {
  save: (input: SaveOrderItemInput) => Promise<SaveOrderItemOutput>
}
