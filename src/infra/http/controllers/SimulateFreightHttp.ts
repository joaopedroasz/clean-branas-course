import { HttpResponse, SimulateFreightHttp } from '../contracts'
import { SimulateFreightHttpInputDTO, SimulateFreightHttpOutputDTO } from '../DTOs'
import { MissingParamError } from '../errors'
import { badRequest, ok } from '../helpers'

export class SimulateFreightHttpController implements SimulateFreightHttp {
  public async handle (request: SimulateFreightHttpInputDTO): Promise<HttpResponse<SimulateFreightHttpOutputDTO | Error>> {
    const error = this.validateRequest(request)
    if (error) return badRequest(error)

    return ok<SimulateFreightHttpOutputDTO>({
      freight: 0
    })
  }

  private validateRequest (request: SimulateFreightHttpInputDTO): Error | undefined {
    const { cep, items } = request
    if (!cep) return new MissingParamError('cep')
    if (!items.length) return new MissingParamError('items')
  }
}
