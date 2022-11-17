import { DistanceCalculator, FreightCalculator } from '@/domain/entities'
import { GetCityByZipCodeGateway } from '@/domain/gateways/City'
import { CalculateFreight, CalculateFreightInput, CalculateFreightOutput } from '../contracts'

export class CalculateFreightUseCase implements CalculateFreight {
  private readonly getCityByZipCodeGateway: GetCityByZipCodeGateway

  constructor (getCityByZipCodeGateway: GetCityByZipCodeGateway) {
    this.getCityByZipCodeGateway = getCityByZipCodeGateway
  }

  public async execute (request: CalculateFreightInput): Promise<CalculateFreightOutput> {
    const [from, to] = await Promise.all([
      this.getCityByZipCodeGateway.getByZipCode(request.from),
      this.getCityByZipCodeGateway.getByZipCode(request.to)
    ])
    const distance = new DistanceCalculator({
      origin: from.getCoordinates(),
      destination: to.getCoordinates()
    }).calculate()
    let total = 0
    for (const item of request.orderItems) {
      total += new FreightCalculator({
        volume: item.volume,
        density: item.density,
        distanceInKm: distance,
        quantity: item.quantity
      }).calculate()
    }

    return {
      freight: total
    }
  }
}
