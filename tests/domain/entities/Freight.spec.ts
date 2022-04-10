import { Freight, Item, FreightProperties } from '@/domain/entities'

const makeSut = (
  {
    item,
    quantity
  }: FreightProperties
): Freight => {
  return new Freight({ item, quantity })
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
    freight = makeSut({ item: itemFake, quantity: 1 })
  })

  test('should be create a freight', () => {
    expect(freight).toBeDefined()
  })

  test('should calculate freight', () => {
    const freightPrice = freight.getValue()

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
    const freight = makeSut({ item, quantity: 1 })
    const freightPrice = freight.getValue()

    expect(freightPrice).toBe(10)
  })
})
