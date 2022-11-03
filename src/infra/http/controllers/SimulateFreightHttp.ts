import { HttpResponse, SimulateFreightHttp } from '../contracts'
import { SimulateFreightHttpInputDTO, SimulateFreightHttpOutputDTO } from '../DTOs'
import { MissingParamError } from '../errors'
import { badRequest, ok } from '../helpers'

export class SimulateFreightHttpController implements SimulateFreightHttp {
  public async handle (request: SimulateFreightHttpInputDTO): Promise<HttpResponse<SimulateFreightHttpOutputDTO | Error>> {
    const { cep } = request
    if (!cep) return badRequest(new MissingParamError('cep'))

    return ok<SimulateFreightHttpOutputDTO>({
      freight: 0
    })
  }
}
