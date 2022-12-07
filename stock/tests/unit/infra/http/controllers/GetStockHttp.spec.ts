import { GetStock } from '@/application/contracts'
import {
  badRequest,
  GetStockHttp,
  GetStockHttpController,
  GetStockHttpInput,
  MissingParamError,
  serverError,
  success,
  unknownServerError
} from '@/infra/http'

const makeRequest = (props?: Partial<GetStockHttpInput>): GetStockHttpInput => ({
  itemId: 'any_item_id',
  ...props
})

const makeGetStock = (): GetStock => ({
  execute: async () => ({
    quantity: 10
  })
})

type SutType = {
  sut: GetStockHttp
  getStock: GetStock
}

const makeSut = (): SutType => {
  const getStock = makeGetStock()
  const sut = new GetStockHttpController(getStock)
  return {
    sut,
    getStock
  }
}

describe('GetStockEntriesHttpController', () => {
  it('should return badRequest if no itemId provided', async () => {
    const { sut } = makeSut()
    const request = makeRequest({ itemId: undefined })
    const httpResponse = await sut.handle(request)

    expect(httpResponse).toEqual(badRequest(new MissingParamError('itemId')))
  })

  it('should call GetStock with correct values', async () => {
    const { sut, getStock } = makeSut()
    const request = makeRequest()
    const executeSpy = vi.spyOn(getStock, 'execute')

    await sut.handle(request)

    expect(executeSpy).toHaveBeenCalledWith({ itemId: request.itemId })
  })

  it('should return GetStock result on success', async () => {
    const { sut } = makeSut()
    const request = makeRequest()
    const httpResponse = await sut.handle(request)

    expect(httpResponse).toEqual(success({
      itemId: request.itemId,
      stockQuantity: 10
    }))
  })

  it('should return unknownServerError if GetStock throws non error instance', async () => {
    const { sut, getStock } = makeSut()
    const request = makeRequest()
    vi.spyOn(getStock, 'execute').mockRejectedValueOnce('any_error')

    const httpResponse = await sut.handle(request)

    expect(httpResponse).toEqual(unknownServerError('any_error'))
  })

  it('should return serverError if GetStock throws error instance', async () => {
    const { sut, getStock } = makeSut()
    const request = makeRequest()
    const error = new Error('any_error')
    vi.spyOn(getStock, 'execute').mockRejectedValueOnce(error)

    const httpResponse = await sut.handle(request)

    expect(httpResponse).toEqual(serverError(error))
  })
})
