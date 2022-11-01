import { Coordinates } from '@/domain/entities'
import { GetCoordinatesByCEPGateway } from '@/domain/gateways/Coordinates'

import { HttpClient } from '../contracts'

type Response = {
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

export class GetCoordinatesByCEPAdapter implements GetCoordinatesByCEPGateway {
  private readonly httpClient: HttpClient
  private readonly baseURL: string

  constructor (baseURL: string, httpClient: HttpClient) {
    this.baseURL = baseURL
    this.httpClient = httpClient
  }

  public async getByCEP (CEP: string): Promise<Coordinates> {
    await this.httpClient.get<Response>({
      url: `${this.baseURL}/${CEP}`
    })

    return new Coordinates({
      longitude: -49.0629788,
      latitude: -26.9244749
    })
  }
}
