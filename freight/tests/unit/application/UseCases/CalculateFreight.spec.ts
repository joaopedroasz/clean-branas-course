import { City, DistanceCalculator, FreightCalculator } from '@/domain/entities'
import { GetCityByZipCodeGateway } from '@/domain/gateways/City'
import { CalculateFreight } from '@/application/contracts'
import { CalculateFreightUseCase } from '@/application/UseCases'

type SutType = {
  sut: CalculateFreight
  getCityByZipCodeGateway: GetCityByZipCodeGateway
}

const makeGetCityByZipCodeRepository = (): GetCityByZipCodeGateway => ({
  getByZipCode: async (zipCode: string) => new City({
    id: 'any_id',
    name: 'any_name',
    latitude: 0,
    longitude: 0
  })
})

const makeSut = (): SutType => {
  const getCityByZipCodeGateway = makeGetCityByZipCodeRepository()
  const sut = new CalculateFreightUseCase(getCityByZipCodeGateway)
  return {
    sut,
    getCityByZipCodeGateway
  }
}

describe('CalculateFreight Use Case', () => {
  beforeEach(() => {
    vitest.spyOn(DistanceCalculator.prototype, 'calculate').mockReturnValueOnce(10)
  })

  afterAll(() => {
    vitest.restoreAllMocks()
  })

  it('should call GetCityByZipCode twice with correct params', async () => {
    const { sut, getCityByZipCodeGateway } = makeSut()
    const getCityByZipCodeSpy = vitest.spyOn(getCityByZipCodeGateway, 'getByZipCode')

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

  it('should call DistanceCalculator with the results from GetCityByZipCode', async () => {
    const { sut } = makeSut()
    const distanceCalculatorSpy = vitest.spyOn(DistanceCalculator.prototype, 'calculate')
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

    expect(distanceCalculatorSpy).toHaveBeenCalledTimes(1)
  })

  it('should call FreightCalculator with orderItems data', async () => {
    const { sut } = makeSut()
    const freightCalculatorSpy = vitest.spyOn(FreightCalculator.prototype, 'calculate')
    await sut.execute({
      from: '11111-111',
      to: '22222-222',
      orderItems: [
        {
          volume: 1,
          density: 2,
          quantity: 3
        },
        {
          volume: 4,
          density: 5,
          quantity: 6
        }
      ]
    })

    expect(freightCalculatorSpy).toHaveBeenCalledTimes(2)
  })
})
