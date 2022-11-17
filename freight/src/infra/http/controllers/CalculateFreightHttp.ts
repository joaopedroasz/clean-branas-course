import { CalculateFreight, CalculateFreightOutput, CalculateFreightInput } from '@/application/contracts'
import { ExternalBadRequestError } from '@/infra/gateways'

import { HttpResponse, CalculateFreightHttp, CalculateFreightHttpInput, CalculateFreightHttpOutput } from '../contracts'
import { MissingParamError } from '../errors'
import { badRequest, serverError, success, unknownError } from '../helpers'

export class CalculateFreightHttpController implements CalculateFreightHttp {
  private readonly calculateFreight: CalculateFreight

  constructor (calculateFreight: CalculateFreight) {
    this.calculateFreight = calculateFreight
  }

  public async handle (request: CalculateFreightHttpInput): Promise<HttpResponse<CalculateFreightHttpOutput | Error>> {
    try {
      const error = this.validateRequest(request)
      if (error) return badRequest(error)

      const simulateFreightInput = this.formatRequest(request)
      const response = await this.calculateFreight.execute(simulateFreightInput)

      return success<CalculateFreightOutput>(response)
    } catch (error) {
      const isError = error instanceof Error
      if (!isError) return unknownError(error)

      const externalBadRequestError = this.externalBadRequestError(error)
      if (externalBadRequestError) return badRequest(externalBadRequestError)

      return serverError(error)
    }
  }

  private validateRequest (request: CalculateFreightHttpInput): Error | undefined {
    const { origin, destination, orderItems } = request
    if (!origin) return new MissingParamError('origin')
    if (!destination) return new MissingParamError('destination')
    if (!orderItems?.length) return new MissingParamError('orderItems')
  }

  private formatRequest (request: CalculateFreightHttpInput): CalculateFreightInput {
    const { destination, origin, orderItems } = request

    return {
      from: origin,
      to: destination,
      orderItems
    }
  }

  private externalBadRequestError (error: Error): Error | undefined {
    const badRequestErrors = [
      ExternalBadRequestError
    ]

    for (const badRequestError of badRequestErrors) {
      if (error instanceof badRequestError) return error
    }
  }
}
