export type Items = {
  itemId: string
  quantity: number
}

export type SimulateFreightInputProps = {
  items: Items[]
  originCEP: string
  destinationCEP: string
}

export class SimulateFreightInputDTO {
  public readonly items: Items[]
  public readonly destinationCEP: string
  public readonly originCEP: string

  constructor ({ items, destinationCEP, originCEP }: SimulateFreightInputProps) {
    this.items = items
    this.destinationCEP = destinationCEP
    this.originCEP = originCEP
  }
}
