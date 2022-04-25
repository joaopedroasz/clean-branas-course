export type SearchOrderByCodeOutputItemProps = {
  id: string
  quantity: number
}

export type SearchOrderByCodeOutputProps = {
  orderId: string
  orderCode: string
  buyerCPF: string
  issueDate: Date
  price: number
  freightValue: number
  couponId?: string
  items: SearchOrderByCodeOutputItemProps[]
}
