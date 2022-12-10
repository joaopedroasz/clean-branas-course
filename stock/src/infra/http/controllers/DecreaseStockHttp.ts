import { DecreaseStock } from '@/application/contracts'
import { DecreaseStockHttp, DecreaseStockHttpInput, DecreaseStockHttpOutput, HttpResponse } from '../contracts'
import { MissingParamError } from '../errors'
import { badRequest, success } from '../helpers'

export class DecreaseStockHttpController implements DecreaseStockHttp {
  private readonly decreaseStock: DecreaseStock

  constructor (decreaseStock: DecreaseStock) {
    this.decreaseStock = decreaseStock
  }

  public async handle (request: DecreaseStockHttpInput): Promise<HttpResponse<DecreaseStockHttpOutput | Error>> {
    const requestError = this.validateRequest(request)
    if (requestError) return badRequest(requestError)

    const { itemId, quantity } = request
    const { amountInStock } = await this.decreaseStock.execute({ itemId, decreaseQuantity: quantity })

    return success<DecreaseStockHttpOutput>({ itemId, amount: amountInStock })
  }

  private validateRequest (request: DecreaseStockHttpInput): MissingParamError | undefined {
    const requiredFields: ['itemId', 'quantity'] = ['itemId', 'quantity']

    for (const field of requiredFields) {
      const fieldExists = !!request[field]
      if (!fieldExists) return new MissingParamError(field)
    }
  }
}
