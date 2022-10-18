import { SimulateFreightInputDTO, SimulateFreightOutputDTO } from '@/application/DTOs'
import { UseCase } from './UseCase'

export interface SimulateFreight extends UseCase<SimulateFreightInputDTO, SimulateFreightOutputDTO> {}
