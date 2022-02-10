import { Freight } from '@/Freight'
import { Item } from '@/Item'

const makeSut = (item: Item): Freight => {
  return new Freight(item)
}

describe('Freight entity', () => {
  let freight: Freight

  beforeEach(() => {
    freight = makeSut(new Item('Categoria do Item 1', 'Descrição do Item 1', 100, 50, 20, 5, 10))
  })

  test('should be create a freight', () => {
    expect(freight).toBeDefined()
  })
})
