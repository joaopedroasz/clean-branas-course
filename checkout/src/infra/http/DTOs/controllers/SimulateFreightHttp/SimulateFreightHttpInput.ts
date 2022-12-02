export type SimulateFreightHttpInputPropsItems = {
  item_id: string
  quantity: number
}

type SimulateFreightHttpInputProps = {
  items: SimulateFreightHttpInputPropsItems[]
  from_cep: string
  to_cep: string
}

export class SimulateFreightHttpInputDTO {
  public readonly items: SimulateFreightHttpInputPropsItems[]
  public readonly from_cep: string
  public readonly to_cep: string

  constructor ({
    items,
    from_cep: fromCEP,
    to_cep: toCEP
  }: SimulateFreightHttpInputProps) {
    this.items = items
    this.from_cep = fromCEP
    this.to_cep = toCEP
  }
}
