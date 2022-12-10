import {
  badRequest,
  DecreaseStockHttp,
  DecreaseStockHttpController,
  DecreaseStockHttpInput,
  MissingParamError
} from '@/infra/http'

const makeRequest = (props?: Partial<DecreaseStockHttpInput>): DecreaseStockHttpInput => ({
  itemId: 'any_id',
  quantity: 1,
  ...props
})

type SutType = {
  sut: DecreaseStockHttp
}

const makeSut = (): SutType => {
  const sut = new DecreaseStockHttpController()
  return {
    sut
  }
}

describe('DecreaseStockHttpController', () => {
  it('should return badRequest if itemId not provided', async () => {
    const { sut } = makeSut()
    const request = makeRequest({ itemId: '' })

    const response = await sut.handle(request)

    expect(response).toEqual(badRequest(new MissingParamError('itemId')))
  })

  it('should return badRequest if quantity not provided', async () => {
    const { sut } = makeSut()
    const request = makeRequest({ quantity: undefined })

    const response = await sut.handle(request)

    expect(response).toEqual(badRequest(new MissingParamError('quantity')))
  })
})
