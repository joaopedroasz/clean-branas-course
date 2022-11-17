import { City } from '@/domain/entities'
import { GetCityByZipCodeGateway } from '@/domain/gateways/City'
import { GetCityByZipCodeGatewayBrasilApiAdapter, HttpClient, RequestParams } from '@/infra/gateways'

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
  })
})

const BASE_URL = 'https://brasilapi.com.br/api/cep/v2/'

type SutType = {
  sut: GetCityByZipCodeGateway
  httpClient: HttpClient
}

const makeSut = (): SutType => {
  const httpClient = makeHttpClient()
  const sut = new GetCityByZipCodeGatewayBrasilApiAdapter(BASE_URL, httpClient)
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

    await sut.getByZipCode(CEP)

    expect(httpClientSpy).toHaveBeenCalledWith({
      url: `${BASE_URL}/${CEP}`
    })
  })

  it('should return City on success', async () => {
    const CEP = '89010025'
    const { sut } = makeSut()

    const city = await sut.getByZipCode(CEP)

    expect(city).toBeInstanceOf(City)
    expect(city).toEqual(new City({
      id: '89010025',
      latitude: -26.9244749,
      longitude: -49.0629788,
      name: 'Blumenau'
    }))
  })
})
