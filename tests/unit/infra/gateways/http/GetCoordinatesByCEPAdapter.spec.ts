import { GetCoordinatesByCEPGateway } from '@/domain/gateways/Coordinates'
import { GetCoordinatesByCEPAdapter, HttpClient, RequestParams } from '@/infra/gateways'

const makeHttpClient = (): HttpClient => ({
  get: async (params: RequestParams): Promise<any> => ({
    cep: '89010025',
    state: 'SC',
    city: 'Blumenau',
    neighborhood: 'Centro',
    street: 'Rua Doutor Luiz de Freitas Melro',
    service: 'viacep',
    location: {
      type: 'Point',
      coordinates: {
        longitude: '-49.0629788',
        latitude: '-26.9244749'
      }
    }
  })
})

const BASE_URL = 'https://brasilapi.com.br/api/cep/v2/'

type SutType = {
  sut: GetCoordinatesByCEPGateway
  httpClient: HttpClient
}

const makeSut = (): SutType => {
  const httpClient = makeHttpClient()
  const sut = new GetCoordinatesByCEPAdapter(BASE_URL, httpClient)
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
})
