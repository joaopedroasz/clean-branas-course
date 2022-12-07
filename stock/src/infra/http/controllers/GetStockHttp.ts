import { GetStockHttp, GetStockHttpInput, GetStockHttpOutput, HttpResponse } from '../contracts'
import { MissingParamError } from '../errors'
import { badRequest } from '../helpers'

export class GetStockHttpController implements GetStockHttp {
  public async handle (request: GetStockHttpInput): Promise<HttpResponse<GetStockHttpOutput | Error >> {
    const errorInRequest = this.validateRequest(request)
    if (errorInRequest) return badRequest(errorInRequest)

    return {
      statusCode: 0,
      body: {
        itemId: '',
        stockQuantity: 0
      }
    }
  }

  private validateRequest (request: GetStockHttpInput): MissingParamError | undefined {
    const requiredFields: ['itemId'] = ['itemId']

    for (const field of requiredFields) {
      const fieldExists = !!request[field]
      if (!fieldExists) return new MissingParamError(field)
    }
  }
}
