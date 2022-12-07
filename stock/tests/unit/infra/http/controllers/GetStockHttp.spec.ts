import {
  badRequest,
  GetStockHttp,
  GetStockHttpController,
  GetStockHttpInput,
  MissingParamError
} from '@/infra/http'

const makeRequest = (props?: Partial<GetStockHttpInput>): GetStockHttpInput => ({
  itemId: 'any_item_id',
  ...props
})

type SutType = {
  sut: GetStockHttp
}

const makeSut = (): SutType => {
  const sut = new GetStockHttpController()
  return {
    sut
  }
}

describe('GetStockEntriesHttpController', () => {
  it('should return badRequest if no itemId provided', async () => {
    const { sut } = makeSut()
    const request = makeRequest({ itemId: undefined })
    const httpResponse = await sut.handle(request)

    expect(httpResponse).toEqual(badRequest(new MissingParamError('itemId')))
  })
})
