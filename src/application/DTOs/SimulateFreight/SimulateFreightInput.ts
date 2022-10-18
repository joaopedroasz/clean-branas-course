export type Items = {
  itemId: string
  quantity: number
}

export type SimulateFreightInputProps = {
  items: Items[]
}

export class SimulateFreightInputDTO {
  public readonly items: Items[]

  constructor ({ items }: SimulateFreightInputProps) {
    this.items = items
  }
}
