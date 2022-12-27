import { GetItemByIdRepository } from '@/domain/repositories/Item'
import { CalculateFreightGateway, CalculateFreightInput, CalculateFreightItem, SimulateFreight } from '@/application/contracts'
import { SimulateFreightInputDTO, SimulateFreightOutputDTO } from '@/application/DTOs'

export class SimulateFreightUseCase implements SimulateFreight {
  private readonly getItemByIdRepository: GetItemByIdRepository
  private readonly calculateFreightGateway: CalculateFreightGateway

  constructor (
    getItemByIdRepository: GetItemByIdRepository,
    calculateFreightGateway: CalculateFreightGateway
  ) {
    this.getItemByIdRepository = getItemByIdRepository
    this.calculateFreightGateway = calculateFreightGateway
  }

  public async execute (input: SimulateFreightInputDTO): Promise<SimulateFreightOutputDTO> {
    const { items, destinationCEP, originCEP } = input
    const calculateFreightItems: CalculateFreightItem[] = []
    for (const { itemId, quantity } of items) {
      const item = await this.getItemByIdRepository.getById(itemId)
      console.log(item)

      calculateFreightItems.push({
        density: item.getDensity(),
        quantity,
        volume: item.getVolume()
      })
    }
    const calculateFreightInput: CalculateFreightInput = {
      from: originCEP,
      to: destinationCEP,
      items: calculateFreightItems
    }
    const { freight } = await this.calculateFreightGateway.calculate(calculateFreightInput)

    return { total: freight }
  }
}
