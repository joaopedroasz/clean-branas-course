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

type SutType = {
  sut: GetItemsByIdsHttp
}

const makeSut = (): SutType => {
  const sut = new GetItemsByIdsHttpController()

  return {
    sut
  }
}

describe('GetItemsByIdsHttpController', () => {
  it('should return bad request if ids not provided', async () => {
    const { sut } = makeSut()
    const input = makeHttpRequest({ itemsIds: undefined })
    const httpResponse = await sut.handle(input)

    expect(httpResponse).toEqual(badRequest(new MissingParamError('itemsIds')))
  })
})
