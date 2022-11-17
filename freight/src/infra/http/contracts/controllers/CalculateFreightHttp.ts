import { HttpController } from './Controller'

export type CalculateFreightHttpOrderItems = {
  volume: number
  density: number
  quantity: number
}

export type CalculateFreightHttpInput = {
  origin: string
  destination: string
  orderItems: CalculateFreightHttpOrderItems[]
}

export type CalculateFreightHttpOutput = {
  freight: number
}

export interface CalculateFreightHttp extends HttpController<CalculateFreightHttpInput, CalculateFreightHttpOutput | Error> {}
