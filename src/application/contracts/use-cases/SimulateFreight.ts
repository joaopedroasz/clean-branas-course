import { UseCase } from './UseCase'
import { SimulateFreightInput, SimulateFreightOutput } from '@/application/dtos/simulate-freight'

export interface SimulateFreightUseCase extends UseCase<SimulateFreightInput[], SimulateFreightOutput> {}
