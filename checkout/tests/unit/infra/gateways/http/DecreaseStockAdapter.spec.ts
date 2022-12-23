import { DecreaseStockGateway } from '@/application/contracts'
import { DecreaseStockHttpGatewayAdapter, HttpClient } from '@/infra/gateways'

const makeHttpClient = (): HttpClient => ({
  get: async (): Promise<any> => ({
    itemId: 'any_id',
    amount: 1
  }),
  post: vi.fn()
})

type SutType = {
  sut: DecreaseStockGateway
  httpClient: HttpClient
}

const makeSut = (): SutType => {
  const httpClient = makeHttpClient()
  const sut = new DecreaseStockHttpGatewayAdapter(httpClient)
  return {
    sut,
    httpClient
  }
}

describe('DecreaseStockHttpGatewayAdapter', () => {
  it('should call httpClient with correct values', async () => {
    const { sut, httpClient } = makeSut()
    const spy = vi.spyOn(httpClient, 'get')

    await sut.decrease({
      itemId: 'any_id',
      quantity: 1
    })

    expect(spy).toHaveBeenCalledWith({
      url: 'decrease-stock',
      params: {
        itemId: 'any_id',
        quantity: 1
      }
    })
  })

  it('should return converted values from httpClient response', async () => {
    const { sut } = makeSut()

    const result = await sut.decrease({
      itemId: 'any_id',
      quantity: 1
    })

    expect(result).toEqual({
      availableQuantity: 1,
      itemId: 'any_id'
    })
  })
})
