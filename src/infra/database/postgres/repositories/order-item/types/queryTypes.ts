export type SaveOrderItemQueryInput = {
  item_id: string
  order_id: string
  items_quantity: number
  price: number
}

export type SaveOrderItemQueryOutput = {
  id: string
}
