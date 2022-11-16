import { UseCase } from './UseCase'

export type CalculateFreightOrderItem = {
  volume: number
  density: number
  quantity: number
}

export type CalculateFreightInput = {
  from: string
  to: string
  orderItems: CalculateFreightOrderItem[]
}

export type CalculateFreightOutput = {
  freight: number
}

export interface CalculateFreight extends UseCase<CalculateFreightInput, CalculateFreightOutput> {}
