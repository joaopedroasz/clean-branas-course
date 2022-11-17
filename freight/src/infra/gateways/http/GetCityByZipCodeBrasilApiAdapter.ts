import { City } from '@/domain/entities'
import { GetCityByZipCodeGateway } from '@/domain/gateways/City'

import { HttpClient } from '../contracts'

type BrasilAPIResponse = {
  cep: string
  state: string
  city: string
  neighborhood: string
  street: string
  service: string
  location: {
    type: string
    coordinates: {
      longitude: string
      latitude: string
    }
  }
}

export class GetCityByZipCodeGatewayBrasilApiAdapter implements GetCityByZipCodeGateway {
  private readonly httpClient: HttpClient
  private readonly baseURL: string

  constructor (baseURL: string, httpClient: HttpClient) {
    this.baseURL = baseURL
    this.httpClient = httpClient
  }

  public async getByZipCode (CEP: string): Promise<City> {
    const response = await this.httpClient.get<BrasilAPIResponse>({
      url: `${this.baseURL}/${CEP}`
    })

    const { city, location, cep } = response

    return new City({
      id: cep,
      name: city,
      latitude: Number(location.coordinates.latitude),
      longitude: Number(location.coordinates.longitude)
    })
  }
}
