import { City, CityProps } from '@/domain/entities'

const makeSut = (props?: Partial<CityProps>): City => new City({
  id: 'any_id',
  name: 'any_name',
  latitude: -5.81,
  longitude: -36.59
})

describe('City Entity', () => {
  it('should create a valid city instance', () => {
    const sut = makeSut()

    expect(sut).toBeDefined()
  })
})
