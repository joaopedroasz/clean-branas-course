import { HttpController } from './Controller'

export type GetStockHttpInput = {
  itemId: string
}

export type GetStockHttpOutput = {
  itemId: string
  stockQuantity: number
}

export interface GetStockHttp extends HttpController<GetStockHttpInput, GetStockHttpOutput | Error> {}
