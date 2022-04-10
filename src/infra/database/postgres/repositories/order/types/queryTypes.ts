export type SaveOrderQueryInput = {
  cpf: string
  issue_date: Date
  price: number
  couponId?: string
  freightValue: number
  orderCode: string
}

export type SaveOrderQueryOutput = {
  id: string
  code: string
}
