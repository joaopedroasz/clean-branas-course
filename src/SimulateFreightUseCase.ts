import { FreightCalculator } from './FreightCalculator'
import { GetItemByIdRepository } from './GetItemByIdRepository'
import { SimulateFreight } from './SimulateFreight'
import { SimulateFreightInputDTO } from './SimulateFreightInput'
import { SimulateFreightOutputDTO } from './SimulateFreightOutputDTO'

export class SimulateFreightUseCase implements SimulateFreight {
  private readonly getItemByIdRepository: GetItemByIdRepository

  constructor (getItemByIdRepository: GetItemByIdRepository) {
    this.getItemByIdRepository = getItemByIdRepository
  }

  public async execute (input: SimulateFreightInputDTO): Promise<SimulateFreightOutputDTO> {
    const { items } = input
    let total = 0

    for (const { itemId, quantity } of items) {
      const item = await this.getItemByIdRepository.getById(itemId)

      total += new FreightCalculator({ item, quantity }).calculate()
    }

    return { total }
  }
}
