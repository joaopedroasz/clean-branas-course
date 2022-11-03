export type SimulateFreightHttpInputPropsItems = {
  item_id: string
  quantity: number
}

type SimulateFreightHttpInputProps = {
  cep: string
  items: SimulateFreightHttpInputPropsItems[]
}

export class SimulateFreightHttpInputDTO {
  public readonly items: SimulateFreightHttpInputPropsItems[]
  public readonly cep: string

  constructor ({ items, cep }: SimulateFreightHttpInputProps) {
    this.items = items
    this.cep = cep
  }
}
