import { GetItemsByIds, GetItemsByIdsOutput } from '@/application/contracts'
import {
  GetItemsByIdsHttp,
  GetItemsByIdsHttpController,
  GetItemsByIdsHttpInput,
  MissingParamError,
  badRequest
} from '@/infra/http'

const makeHttpRequest = (overrides?: Partial<GetItemsByIdsHttpInput>): GetItemsByIdsHttpInput => ({
  itemsIds: 'any_item_id,other_item_id,another_item_id',
  ...overrides
})

const makeGetItemsByIds = (): GetItemsByIds => ({
  execute: async (): Promise<GetItemsByIdsOutput> => ({
    items: [
      {
        id: 'any_item_id',
        depth: 1,
        description: 'any_description',
        height: 1,
        price: 1,
        weight: 1,
        width: 1
      }
    ]
  })
})

type SutType = {
  sut: GetItemsByIdsHttp
  getItemsByIds: GetItemsByIds
}

const makeSut = (): SutType => {
  const getItemsByIds = makeGetItemsByIds()
  const sut = new GetItemsByIdsHttpController(getItemsByIds)

  return {
    sut,
    getItemsByIds
  }
}

describe('GetItemsByIdsHttpController', () => {
  it('should return bad request if ids not provided', async () => {
    const { sut } = makeSut()
    const input = makeHttpRequest({ itemsIds: undefined })
    const httpResponse = await sut.handle(input)

    expect(httpResponse).toEqual(badRequest(new MissingParamError('itemsIds')))
  })

  it('should call GetItemsByIds with correct values', async () => {
    const { sut, getItemsByIds } = makeSut()
    const input = makeHttpRequest()
    const executeSpy = vi.spyOn(getItemsByIds, 'execute')

    await sut.handle(input)

    expect(executeSpy).toHaveBeenCalledWith({
      ids: ['any_item_id', 'other_item_id', 'another_item_id']
    })
  })
})
