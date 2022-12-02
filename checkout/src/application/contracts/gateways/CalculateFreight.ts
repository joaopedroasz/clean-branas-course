export type CalculateFreightItem = {
  volume: number
  density: number
  quantity: number
}

export type CalculateFreightInput = {
  from: string
  to: string
  items: CalculateFreightItem[]
}

export type CalculateFreightOutput = {
  freight: number
}

export interface CalculateFreightGateway {
  calculate: (input: CalculateFreightInput) => Promise<CalculateFreightOutput>
}
