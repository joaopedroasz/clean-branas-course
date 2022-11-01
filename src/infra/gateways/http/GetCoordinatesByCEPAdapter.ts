import { Coordinates } from '@/domain/entities'
import { GetCoordinatesByCEPGateway } from '@/domain/gateways/Coordinates'

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

export class GetCoordinatesByCEPGatewayBrasilAPIAdapter implements GetCoordinatesByCEPGateway {
  private readonly httpClient: HttpClient
  private readonly baseURL: string

  constructor (baseURL: string, httpClient: HttpClient) {
    this.baseURL = baseURL
    this.httpClient = httpClient
  }

  public async getByCEP (CEP: string): Promise<Coordinates> {
    const response = await this.httpClient.get<BrasilAPIResponse>({
      url: `${this.baseURL}/${CEP}`
    })

    const { latitude, longitude } = response.location.coordinates

    return new Coordinates({
      longitude: Number(longitude),
      latitude: Number(latitude)
    })
  }
}
