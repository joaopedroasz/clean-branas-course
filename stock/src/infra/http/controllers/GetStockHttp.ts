import { GetStock } from '@/application/contracts'
import { GetStockHttp, GetStockHttpInput, GetStockHttpOutput, HttpResponse } from '../contracts'
import { MissingParamError } from '../errors'
import { badRequest } from '../helpers'

export class GetStockHttpController implements GetStockHttp {
  private readonly getStock: GetStock

  constructor (getStock: GetStock) {
    this.getStock = getStock
  }

  public async handle (request: GetStockHttpInput): Promise<HttpResponse<GetStockHttpOutput | Error >> {
    const errorInRequest = this.validateRequest(request)
    if (errorInRequest) return badRequest(errorInRequest)

    const { itemId } = request
    await this.getStock.execute({ itemId })

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
