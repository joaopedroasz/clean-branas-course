import { DistanceCalculator, FreightCalculator } from '@/domain/entities'
import { GetCityByZipCodeRepository } from '@/domain/repositories/City'
import { CalculateFreight, CalculateFreightInput, CalculateFreightOutput } from '../contracts'

export class CalculateFreightUseCase implements CalculateFreight {
  private readonly getCityByZipCodeRepository: GetCityByZipCodeRepository

  constructor (getCityByZipCodeRepository: GetCityByZipCodeRepository) {
    this.getCityByZipCodeRepository = getCityByZipCodeRepository
  }

  public async execute (request: CalculateFreightInput): Promise<CalculateFreightOutput> {
    const from = await this.getCityByZipCodeRepository.getByZipCode(request.from)
    const to = await this.getCityByZipCodeRepository.getByZipCode(request.to)
    const distance = new DistanceCalculator({
      origin: from.getCoordinates(),
      destination: to.getCoordinates()
    }).calculate()
    for (const item of request.orderItems) {
      new FreightCalculator({
        volume: item.volume,
        density: item.density,
        distanceInKm: distance,
        quantity: item.quantity
      }).calculate()
    }

    return {
      freight: 0
    }
  }
}
