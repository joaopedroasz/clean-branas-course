import { Freight } from '@/Freight'
import { Item } from '@/Item'

const makeSut = (item: Item): Freight => {
  return new Freight(item)
}

describe('Freight entity', () => {
  let freight: Freight

  beforeEach(() => {
    freight = makeSut(new Item('Categoria do Item 1', 'Descrição do Item 1', 100, 200, 100, 50, 40))
  })

  test('should be create a freight', () => {
    expect(freight).toBeDefined()
  })

  test('should calculate freight', () => {
    const freightPrice = freight.calculate()

    expect(freightPrice).toBe(400)
  })

  test('should calculate a minimum value for freight', () => {
    const freight = makeSut(new Item('Categoria do Item 2', 'Descrição do Item 2', 30, 10, 10, 10, 0.9))
    const freightPrice = freight.calculate()

    expect(freightPrice).toBe(10)
  })
})
