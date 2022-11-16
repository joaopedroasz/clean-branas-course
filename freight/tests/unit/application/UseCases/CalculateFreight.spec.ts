import { City } from '@/domain/entities'
import { GetCityByZipCodeRepository } from '@/domain/repositories/City'
import { CalculateFreight } from '@/application/contracts'
import { CalculateFreightUseCase } from '@/application/UseCases'

type SutType = {
  sut: CalculateFreight
  getCityByZipCodeRepository: GetCityByZipCodeRepository
}

const makeGetCityByZipCodeRepository = (): GetCityByZipCodeRepository => ({
  getByZipCode: async (zipCode: string) => new City({
    id: 'any_id',
    name: 'any_name',
    latitude: 0,
    longitude: 0
  })
})

const makeSut = (): SutType => {
  const getCityByZipCodeRepository = makeGetCityByZipCodeRepository()
  const sut = new CalculateFreightUseCase(getCityByZipCodeRepository)
  return {
    sut,
    getCityByZipCodeRepository
  }
}

describe('CalculateFreight Use Case', () => {
  it('should call GetCityByZipCode twice with correct params', async () => {
    const { sut, getCityByZipCodeRepository } = makeSut()
    const getCityByZipCodeSpy = vitest.spyOn(getCityByZipCodeRepository, 'getByZipCode')

    await sut.execute({
      from: '11111-111',
      to: '22222-222',
      orderItems: [
        {
          volume: 1,
          density: 2,
          quantity: 3
        }
      ]
    })

    expect(getCityByZipCodeSpy).toHaveBeenCalledTimes(2)
    expect(getCityByZipCodeSpy).toHaveBeenCalledWith('11111-111')
    expect(getCityByZipCodeSpy).toHaveBeenCalledWith('22222-222')
  })
})
