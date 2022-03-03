import { Freight, Item } from '@/domain/entities'

const makeSut = (item: Item): Freight => {
  return new Freight(item)
}

describe('Freight entity', () => {
  let freight: Freight
  const itemFake = new Item({
    id: '1',
    category: 'Categoria do item 1',
    description: 'Descrição do item 1',
    price: 100,
    heightInCM: 200,
    widthInCM: 100,
    depthInCM: 50,
    weightInCM: 50
  })

  beforeEach(() => {
    freight = makeSut(itemFake)
  })

  test('should be create a freight', () => {
    expect(freight).toBeDefined()
  })

  test('should calculate freight', () => {
    const freightPrice = freight.calculate()

    expect(freightPrice).toBe(500)
  })

  test('should calculate a minimum value for freight', () => {
    const item = new Item({
      ...itemFake,
      heightInCM: 10,
      widthInCM: 10,
      depthInCM: 10,
      weightInCM: 0.9
    })
    const freight = makeSut(item)
    const freightPrice = freight.calculate()

    expect(freightPrice).toBe(10)
  })
})
