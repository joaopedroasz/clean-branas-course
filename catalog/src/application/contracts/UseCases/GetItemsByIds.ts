import { UseCase } from './UseCase'

export type GetItemsByIdsInput = {
  ids: string[]
}

export type GetItemsByIdsItems = {
  id: string
  description: string
  price: number
  height: number
  width: number
  depth: number
  weight: number
}

export type GetItemsByIdsOutput = {
  items: GetItemsByIdsItems[]
}

export interface GetItemsByIds extends UseCase<GetItemsByIdsInput, GetItemsByIdsOutput> {}
