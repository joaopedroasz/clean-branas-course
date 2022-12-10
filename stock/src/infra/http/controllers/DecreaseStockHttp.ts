import { DecreaseStockHttp, DecreaseStockHttpInput, DecreaseStockHttpOutput, HttpResponse } from '../contracts'
import { MissingParamError } from '../errors'
import { badRequest } from '../helpers'

export class DecreaseStockHttpController implements DecreaseStockHttp {
  public async handle (request: DecreaseStockHttpInput): Promise<HttpResponse<DecreaseStockHttpOutput | Error>> {
    const requestError = this.validateRequest(request)
    if (requestError) return badRequest(requestError)

    return {
      statusCode: 0,
      body: {
        itemId: '',
        amount: 0
      }
    }
  }

  private validateRequest (request: DecreaseStockHttpInput): MissingParamError | undefined {
    const requiredFields: ['itemId', 'quantity'] = ['itemId', 'quantity']

    for (const field of requiredFields) {
      const fieldExists = !!request[field]
      if (!fieldExists) return new MissingParamError(field)
    }
  }
}
