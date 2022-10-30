export type Items = {
  itemId: string
  quantity: number
}

export type SimulateFreightInputProps = {
  items: Items[]
  destinationCEP: string
}

export class SimulateFreightInputDTO {
  public readonly items: Items[]
  public readonly destinationCEP: string

  constructor ({ items, destinationCEP }: SimulateFreightInputProps) {
    this.items = items
    this.destinationCEP = destinationCEP
  }
}
