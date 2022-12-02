import { CalculateFreightGateway } from '@/application/contracts'
import { CalculateFreightExternalAPIAdapter, HttpClient } from '@/infra/gateways'

const makeHttpClient = (): HttpClient => ({
  post: async (): Promise<any> => ({
    freight: 10
  }),
  get: vi.fn()
})

const BASE_URL = 'http://localhost:4001/calculate-freight'

type SutType = {
  sut: CalculateFreightGateway
  httpClient: HttpClient
}

const makeSut = (): SutType => {
  const httpClient = makeHttpClient()
  const sut = new CalculateFreightExternalAPIAdapter(BASE_URL, httpClient)
  return {
    sut,
    httpClient
  }
}

describe('CalculateFreightExternalAPIAdapter', () => {
  it('should call HttpClient.post with correct values', async () => {
    const { sut, httpClient } = makeSut()
    const httpClientSpy = vi.spyOn(httpClient, 'post')

    await sut.calculate({
      from: 'any_from',
      to: 'any_to',
      items: [
        {
          density: 1,
          quantity: 1,
          volume: 1
        }
      ]
    })

    expect(httpClientSpy).toHaveBeenCalledWith({
      url: BASE_URL,
      body: {
        origin: 'any_from',
        destination: 'any_to',
        orderItems: [
          {
            density: 1,
            quantity: 1,
            volume: 1
          }
        ]
      }
    })
  })
})
