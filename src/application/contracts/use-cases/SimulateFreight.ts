import { UseCase } from './UseCase'
import { SimulateFreightInput, SimulateFreightOutput } from '@/application/dtos'

export interface SimulateFreightUseCase extends UseCase<SimulateFreightInput[], SimulateFreightOutput> {}
