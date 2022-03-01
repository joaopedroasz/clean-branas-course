import { SaveOrderInput, SaveOrderOutput } from './types'

export interface OrderRepository {
  save: (input: SaveOrderInput) => Promise<SaveOrderOutput>
}
