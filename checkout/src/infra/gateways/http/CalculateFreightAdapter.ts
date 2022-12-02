import { CalculateFreightGateway, CalculateFreightInput, CalculateFreightOutput } from '@/application/contracts'
import { HttpClient } from '../contracts'

export class CalculateFreightExternalAPIAdapter implements CalculateFreightGateway {
  private readonly baseUrl: string
  private readonly httpClient: HttpClient

  constructor (baseUrl: string, httpClient: HttpClient) {
    this.baseUrl = baseUrl
    this.httpClient = httpClient
  }

  public async calculate (input: CalculateFreightInput): Promise<CalculateFreightOutput> {
    const { from, items, to } = input
    const { freight } = await this.httpClient.post({
      url: this.baseUrl,
      body: {
        origin: from,
        destination: to,
        orderItems: items
      }
    })

    return { freight }
  }
}
