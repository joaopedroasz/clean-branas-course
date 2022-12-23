import { DecreaseStockGateway, DecreaseStockInput, DecreaseStockOutput } from '@/application/contracts'
import { HttpClient } from '../contracts'

type DecreaseStockResponse = {
  itemId: string
  amount: number
}

export class DecreaseStockHttpGatewayAdapter implements DecreaseStockGateway {
  private readonly httpClient: HttpClient

  constructor (httpClient: HttpClient) {
    this.httpClient = httpClient
  }

  public async decrease ({ itemId, quantity }: DecreaseStockInput): Promise<DecreaseStockOutput> {
    const { amount, itemId: itemID } = await this.httpClient.get<DecreaseStockResponse>({
      url: 'decrease-stock',
      params: { itemId, quantity }
    })
    return {
      availableQuantity: amount,
      itemId: itemID
    }
  }
}
