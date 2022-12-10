import { DecreaseStock } from '@/application/contracts'
import {
  badRequest,
  DecreaseStockHttp,
  DecreaseStockHttpController,
  DecreaseStockHttpInput,
  MissingParamError,
  serverError,
  success,
  unknownServerError
} from '@/infra/http'

const makeRequest = (props?: Partial<DecreaseStockHttpInput>): DecreaseStockHttpInput => ({
  itemId: 'any_id',
  quantity: 1,
  ...props
})

const makeDecreaseStock = (): DecreaseStock => ({
  execute: async () => ({
    itemId: 'any_id',
    amountInStock: 1
  })
})

type SutType = {
  sut: DecreaseStockHttp
  decreaseStock: DecreaseStock
}

const makeSut = (): SutType => {
  const decreaseStock = makeDecreaseStock()
  const sut = new DecreaseStockHttpController(decreaseStock)
  return {
    sut,
    decreaseStock
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

  it('should call decreaseStock with correct values', async () => {
    const { sut, decreaseStock } = makeSut()
    const request = makeRequest()
    const decreaseStockSpy = vi.spyOn(decreaseStock, 'execute')

    await sut.handle(request)

    expect(decreaseStockSpy).toHaveBeenCalledWith({
      itemId: request.itemId,
      decreaseQuantity: request.quantity
    })
  })

  it('should return decreaseStock result on success', async () => {
    const { sut } = makeSut()
    const request = makeRequest()

    const response = await sut.handle(request)

    expect(response).toEqual(success({
      itemId: 'any_id',
      amount: 1
    }))
  })

  it('should return unknownServerError if decreaseStock throws non error instance', async () => {
    const { sut, decreaseStock } = makeSut()
    const request = makeRequest()
    vi.spyOn(decreaseStock, 'execute').mockRejectedValueOnce('any_error')

    const response = await sut.handle(request)

    expect(response).toEqual(unknownServerError('any_error'))
  })

  it('should return serverError if decreaseStock throws error instance', async () => {
    const { sut, decreaseStock } = makeSut()
    const request = makeRequest()
    vi.spyOn(decreaseStock, 'execute').mockRejectedValueOnce(new Error('any_error'))

    const response = await sut.handle(request)

    expect(response).toEqual(serverError(new Error('any_error')))
  })
})
