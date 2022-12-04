import { UseCase } from './UseCase'

export type DecreaseStockInput = {
  itemId: string
  decreaseQuantity: number
}

export type DecreaseStockOutput = {
  itemId: string
  amountInStock: number
}

export interface DecreaseStock extends UseCase<DecreaseStockInput, DecreaseStockOutput> {}
