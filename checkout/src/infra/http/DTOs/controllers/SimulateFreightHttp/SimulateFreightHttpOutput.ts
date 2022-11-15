export type SimulateFreightHttpOutputProps = {
  freight: number
}

export class SimulateFreightHttpOutputDTO {
  public readonly freight: number

  constructor ({ freight }: SimulateFreightHttpOutputProps) {
    this.freight = freight
  }
}
