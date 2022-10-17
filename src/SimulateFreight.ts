import { SimulateFreightInputDTO } from './SimulateFreightInput'
import { SimulateFreightOutputDTO } from './SimulateFreightOutputDTO'
import { UseCase } from './UseCase'

export interface SimulateFreight extends UseCase<SimulateFreightInputDTO, SimulateFreightOutputDTO> {}
