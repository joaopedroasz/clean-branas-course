import { SimulateFreight } from '@/application/contracts'
import { SimulateFreightInputDTO } from '@/application/DTOs'

import { HttpResponse, SimulateFreightHttp } from '../contracts'
import { SimulateFreightHttpInputDTO, SimulateFreightHttpOutputDTO } from '../DTOs'
import { MissingParamError } from '../errors'
import { badRequest, ok, serverError, unknownError } from '../helpers'

export class SimulateFreightHttpController implements SimulateFreightHttp {
  private readonly simulateFreight: SimulateFreight

  constructor (simulateFreight: SimulateFreight) {
    this.simulateFreight = simulateFreight
  }

  public async handle (request: SimulateFreightHttpInputDTO): Promise<HttpResponse<SimulateFreightHttpOutputDTO | Error>> {
    try {
      const error = this.validateRequest(request)
      if (error) return badRequest(error)

      const simulateFreightInput = this.formatRequest(request)
      const { total } = await this.simulateFreight.execute(simulateFreightInput)

      return ok<SimulateFreightHttpOutputDTO>({
        freight: total
      })
    } catch (error) {
      const isError = error instanceof Error
      if (!isError) return unknownError(error)

      return serverError(error)
    }
  }

  private validateRequest (request: SimulateFreightHttpInputDTO): Error | undefined {
    const { cep, items } = request
    if (!cep) return new MissingParamError('cep')
    if (!items.length) return new MissingParamError('items')
  }

  private formatRequest (request: SimulateFreightHttpInputDTO): SimulateFreightInputDTO {
    const { cep, items } = request

    return {
      destinationCEP: cep,
      items: items.map(item => ({
        itemId: item.item_id,
        quantity: item.quantity
      }))
    }
  }
}
