import { SimulateFreightInputProperties } from './types'

export class SimulateFreightInput {
  public readonly itemId: number
  public readonly quantity: number

  constructor (
    {
      itemId,
      quantity
    }: SimulateFreightInputProperties
  ) {
    this.itemId = itemId
    this.quantity = quantity
  }
}
