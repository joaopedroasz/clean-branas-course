import { Item } from '@/Item'

const makeSut = (
  category: string,
  description: string,
  price: number,
  height: number,
  width: number,
  depth: number,
  weight: number,
  id?: string
): Item => {
  return new Item(category, description, price, height, width, depth, weight, id)
}

describe('Item entity', () => {
  let item: Item

  beforeEach(() => {
    item = makeSut('Categoria do item 1', 'Descrição do item 1', 20, 50, 10, 10, 5, '1')
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
})
