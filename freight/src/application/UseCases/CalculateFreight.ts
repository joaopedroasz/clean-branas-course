import { DistanceCalculator } from '@/domain/entities'
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
    new DistanceCalculator({
      origin: from.getCoordinates(),
      destination: to.getCoordinates()
    }).calculate()

    return {
      freight: 0
    }
  }
}
