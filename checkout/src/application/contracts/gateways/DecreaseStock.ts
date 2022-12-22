export type DecreaseStockInput = {
  itemId: string
  quantity: number
}

export type DecreaseStockOutput = {
  itemId: string
  availableQuantity: number
}

export interface DecreaseStockGateway {
  decrease: (input: DecreaseStockInput) => Promise<DecreaseStockOutput>
}
