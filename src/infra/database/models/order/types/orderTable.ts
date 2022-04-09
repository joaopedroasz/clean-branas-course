export type OrderTableProperties = {
  id: string
  buyer_cpf: string
  issue_date: Date
  price: number
  coupon_id?: string
  freight_value: number
  code: string
}
