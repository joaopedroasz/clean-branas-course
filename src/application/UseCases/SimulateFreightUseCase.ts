import { FreightCalculator } from '@/domain/entities'
import { GetCoordinatesByCEPGateway } from '@/domain/gateways/Coordinates'
import { GetItemByIdRepository } from '@/domain/repositories/Item'
import { SimulateFreight } from '@/application/contracts'
import { SimulateFreightInputDTO, SimulateFreightOutputDTO } from '@/application/DTOs'

export class SimulateFreightUseCase implements SimulateFreight {
  private readonly getItemByIdRepository: GetItemByIdRepository
  private readonly getCoordinatesByCEPGateway: GetCoordinatesByCEPGateway

  constructor (
    getItemByIdRepository: GetItemByIdRepository,
    getCoordinatesByCEPGateway: GetCoordinatesByCEPGateway
  ) {
    this.getItemByIdRepository = getItemByIdRepository
    this.getCoordinatesByCEPGateway = getCoordinatesByCEPGateway
  }

  public async execute (input: SimulateFreightInputDTO): Promise<SimulateFreightOutputDTO> {
    const { items, destinationCEP } = input
    let total = 0

    for (const { itemId, quantity } of items) {
      const item = await this.getItemByIdRepository.getById(itemId)

      total += new FreightCalculator({ item, quantity }).calculate()
    }

    await this.getCoordinatesByCEPGateway.getByCEP(destinationCEP)

    return { total }
  }
}
