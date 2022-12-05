import { UseCase } from './UseCase'

export type GetStockInput = {
  itemId: string
}

export type GetStockOutput = {
  quantity: number
}

export interface GetStock extends UseCase<GetStockInput, GetStockOutput> {}
