import { Item, ItemProperties } from '@/domain/entities'
import { InvalidEmptyIdError } from '@/domain/errors'

const makeSut = (
  {
    id,
    category,
    description,
    price,
    heightInCM,
    widthInCM,
    depthInCM,
    weightInCM
  }: ItemProperties
): Item => {
  return new Item({
    id,
    category,
    description,
    price,
    heightInCM,
    widthInCM,
    depthInCM,
    weightInCM
  })
}

describe('Item entity', () => {
  let item: Item

  beforeEach(() => {
    item = makeSut({
      id: '1',
      category: 'Categoria do item 1',
      description: 'Descrição do item 1',
      price: 20,
      heightInCM: 50,
      widthInCM: 10,
      depthInCM: 10,
      weightInCM: 5
    })
  })

  test('should create a item', () => {
    expect(item).toBeDefined()
  })

  test('should calculate volume', () => {
    const volume = item.calculateVolume()

    expect(volume).toBe(0.005)
  })

  test('should calculate density', () => {
    const volume = item.calculateDensity()

    expect(volume).toBe(1_000)
  })

  test('should throw an error when get a undefined id', () => {
    const item = makeSut({
      category: 'Categoria do item 1',
      description: 'Descrição do item 1',
      price: 20,
      heightInCM: 50,
      widthInCM: 10,
      depthInCM: 10,
      weightInCM: 5
    })

    const getAnUndefinedId = (): string => item.getId()

    expect(getAnUndefinedId).toThrowError(new InvalidEmptyIdError())
  })
})
