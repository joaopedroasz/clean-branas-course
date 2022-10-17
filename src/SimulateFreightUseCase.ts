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

    for (const item of items) {
      const { itemId } = item
      await this.getItemByIdRepository.getById(itemId)
    }

    return {
      total: 10
    }
  }
}
