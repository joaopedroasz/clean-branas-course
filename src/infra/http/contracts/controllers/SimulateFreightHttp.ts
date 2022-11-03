import { HttpController } from './controller'
import { SimulateFreightHttpInputDTO, SimulateFreightHttpOutputDTO } from '../../DTOs'

export interface SimulateFreightHttp extends HttpController<SimulateFreightHttpInputDTO, SimulateFreightHttpOutputDTO> {}
