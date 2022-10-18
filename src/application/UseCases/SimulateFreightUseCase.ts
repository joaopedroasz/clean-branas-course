import { FreightCalculator } from '@/domain/entities'
import { GetItemByIdRepository } from '@/domain/repositories/Item'
import { SimulateFreight } from '@/application/contracts'
import { SimulateFreightInputDTO, SimulateFreightOutputDTO } from '@/application/DTOs'

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
