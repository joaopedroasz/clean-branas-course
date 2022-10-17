export type SimulateFreightOutputProps = {
  total: number
}

export class SimulateFreightOutputDTO {
  public readonly total: number

  constructor ({ total }: SimulateFreightOutputProps) {
    this.total = total
  }
}
