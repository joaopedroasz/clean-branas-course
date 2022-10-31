import { Coordinates, DistanceCalculator, FreightCalculator } from '@/domain/entities'
import { GetCoordinatesByCEPGateway } from '@/domain/gateways/Coordinates'
import { GetItemByIdRepository } from '@/domain/repositories/Item'
import { SimulateFreight } from '@/application/contracts'
import { SimulateFreightInputDTO, SimulateFreightOutputDTO } from '@/application/DTOs'

export class SimulateFreightUseCase implements SimulateFreight {
  private readonly defaultOriginCoordinates = new Coordinates({
    latitude: -6.68491,
    longitude: -36.6566
  })

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

    const destinationCoordinates = await this.getCoordinatesByCEPGateway.getByCEP(destinationCEP)

    const distanceInKm = new DistanceCalculator({
      origin: this.defaultOriginCoordinates,
      destination: destinationCoordinates
    }).calculate()

    for (const { itemId, quantity } of items) {
      const item = await this.getItemByIdRepository.getById(itemId)

      const freight = new FreightCalculator({ item, quantity, distanceInKm }).calculate()

      total += freight
    }

    return { total }
  }
}
