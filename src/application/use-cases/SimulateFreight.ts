import { Freight } from '@/domain/entities'
import { ItemRepository } from '@/domain/repositories'
import { SimulateFreightUseCase } from '../contracts/use-cases/SimulateFreight'
import { SimulateFreightInput, SimulateFreightOutput } from '../dtos/simulate-freight'

export class SimulateFreight implements SimulateFreightUseCase {
  private readonly itemRepository: ItemRepository

  constructor (itemRepository: ItemRepository) {
    this.itemRepository = itemRepository
  }

  public async execute (input: SimulateFreightInput[]): Promise<SimulateFreightOutput> {
    let totalValue: number = 0

    for (const simulateFreightInput of input) {
      const item = await this.itemRepository.getById(simulateFreightInput.itemId)
      const freight = new Freight({
        item,
        quantity: simulateFreightInput.quantity
      })
      totalValue += freight.calculate()
    }

    return {
      totalValue
    }
  }
}
