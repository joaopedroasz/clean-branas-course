import { HttpResponse, SimulateFreightHttp } from '../contracts'
import { SimulateFreightHttpInputDTO, SimulateFreightHttpOutputDTO } from '../DTOs'
import { MissingParamError } from '../errors'

export class SimulateFreightHttpController implements SimulateFreightHttp {
  public async handle (request: SimulateFreightHttpInputDTO): Promise<HttpResponse<SimulateFreightHttpOutputDTO>> {
    const { cep } = request
    if (!cep) {
      return {
        statusCode: 400,
        body: new MissingParamError('cep')
      }
    }

    return {
      statusCode: 200,
      body: {
        freight: 10
      }
    }
  }
}
