import { Coordinates } from '@/domain/entities'
import { GetCoordinatesByCEPGateway } from '@/domain/gateways/Coordinates'
import { GetCoordinatesByCEPGatewayBrasilAPIAdapter, HttpClient, RequestParams } from '@/infra/gateways'

const makeHttpClient = (): HttpClient => ({
  get: async (params: RequestParams): Promise<any> => ({
    cep: '89010025',
    state: 'SC',
    city: 'Blumenau',
    neighborhood: 'Centro',
    street: 'Rua Doutor Luiz de Freitas Melro',
    service: 'brasil-api',
    location: {
      type: 'Point',
      coordinates: {
        longitude: '-49.0629788',
        latitude: '-26.9244749'
      }
    }
  }),
  post: vi.fn()
})

const BASE_URL = 'https://brasilapi.com.br/api/cep/v2/'

type SutType = {
  sut: GetCoordinatesByCEPGateway
  httpClient: HttpClient
}

const makeSut = (): SutType => {
  const httpClient = makeHttpClient()
  const sut = new GetCoordinatesByCEPGatewayBrasilAPIAdapter(BASE_URL, httpClient)
  return {
    sut,
    httpClient
  }
}

describe('GetCoordinatesByCEPAdapter', () => {
  it('should call HttpClient correctly', async () => {
    const CEP = '89010025'
    const { sut, httpClient } = makeSut()
    const httpClientSpy = vi.spyOn(httpClient, 'get')

    await sut.getByCEP(CEP)

    expect(httpClientSpy).toHaveBeenCalledWith({
      url: `${BASE_URL}/${CEP}`
    })
  })

  it('should return Coordinates on success', async () => {
    const CEP = '89010025'
    const { sut } = makeSut()

    const coordinates = await sut.getByCEP(CEP)

    expect(coordinates).toBeInstanceOf(Coordinates)
    expect(coordinates).toEqual(new Coordinates({
      longitude: -49.0629788,
      latitude: -26.9244749
    }))
  })
})
