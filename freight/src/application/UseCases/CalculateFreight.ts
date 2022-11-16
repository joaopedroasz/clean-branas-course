import { GetCityByZipCodeRepository } from '@/domain/repositories/City'
import { CalculateFreight, CalculateFreightInput, CalculateFreightOutput } from '../contracts'

export class CalculateFreightUseCase implements CalculateFreight {
  private readonly getCityByZipCodeRepository: GetCityByZipCodeRepository

  constructor (getCityByZipCodeRepository: GetCityByZipCodeRepository) {
    this.getCityByZipCodeRepository = getCityByZipCodeRepository
  }

  public async execute (request: CalculateFreightInput): Promise<CalculateFreightOutput> {
    await this.getCityByZipCodeRepository.getByZipCode(request.from)
    await this.getCityByZipCodeRepository.getByZipCode(request.to)

    return {
      freight: 0
    }
  }
}
