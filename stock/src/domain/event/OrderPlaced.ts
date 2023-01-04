import { DomainEvent } from './DomainEvent'

export type OrderPlacedItems = {
  id: string
  quantity: number
}

export type OrderPlacedPayload = {
  code: string
  items: OrderPlacedItems
}

export class OrderPlaced implements DomainEvent {
  public readonly name = 'OrderPlaced'

  public readonly code: string
  public readonly items: OrderPlacedItems

  constructor (payload: OrderPlacedPayload) {
    this.code = payload.code
    this.items = payload.items
  }
}
