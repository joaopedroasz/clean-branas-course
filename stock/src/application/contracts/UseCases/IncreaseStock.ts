import { UseCase } from './UseCase'

export type IncreaseStockInput = {
  itemId: string
  quantity: number
}

export type IncreaseStockOutput = {
  itemId: string
  amountInStock: number
}

export interface IncreaseStock extends UseCase<IncreaseStockInput, IncreaseStockOutput> {}
