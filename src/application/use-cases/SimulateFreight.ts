import { SimulateFreightUseCase } from '../contracts/use-cases/SimulateFreight'
import { SimulateFreightInput, SimulateFreightOutput } from '../dtos/simulate-freight'

export class SimulateFreight implements SimulateFreightUseCase {
  public async execute (input: SimulateFreightInput): Promise<SimulateFreightOutput> {
    return {
      totalValue: 0
    }
  }
}
