import { Coordinates, CoordinatesProps } from '@/domain/entities'

const makeSut = (props?: Partial<CoordinatesProps>): Coordinates => new Coordinates({
  latitude: -5.81,
  longitude: -36.59,
  ...props
})

describe('Coordinates Entity', () => {
  it('should create valid instance', () => {
    const sut = makeSut({
      latitude: 123,
      longitude: 123
    })

    expect(sut).toBeDefined()
  })
})
