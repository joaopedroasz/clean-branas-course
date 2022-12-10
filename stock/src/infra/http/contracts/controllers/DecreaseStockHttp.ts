import { HttpController } from './Controller'

export type DecreaseStockHttpInput = {
  itemId: string
  quantity: number
}

export type DecreaseStockHttpOutput = {
  itemId: string
  amount: number
}

export interface DecreaseStockHttp extends HttpController<DecreaseStockHttpInput, DecreaseStockHttpOutput | Error> {}
