import { DecreaseStockGateway, DecreaseStockInput, DecreaseStockOutput } from '@/application/contracts'
import { HttpClient } from '../contracts'

export class DecreaseStockHttpGatewayAdapter implements DecreaseStockGateway {
  private readonly httpClient: HttpClient

  constructor (httpClient: HttpClient) {
    this.httpClient = httpClient
  }

  public async decrease ({ itemId, quantity }: DecreaseStockInput): Promise<DecreaseStockOutput> {
    await this.httpClient.get({
      url: 'decrease-stock',
      params: { itemId, quantity }
    })
    return {
      availableQuantity: 0,
      itemId: ''
    }
  }
}
