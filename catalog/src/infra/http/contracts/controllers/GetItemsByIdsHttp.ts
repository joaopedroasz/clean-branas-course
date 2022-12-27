import { HttpController } from './HttpController'

export type GetItemsByIdsHttpInput = {
  itemsIds: string
}

export type GetItemsByIdsHttpItem = {
  id: string
  description: string
  price: number
  weight: number
  width: number
  height: number
  length: number
  depth: number
}

export type GetItemsByIdsHttpOutput = {
  items: GetItemsByIdsHttpItem[]
}

export interface GetItemsByIdsHttp extends HttpController<GetItemsByIdsHttpInput, GetItemsByIdsHttpOutput> {}
