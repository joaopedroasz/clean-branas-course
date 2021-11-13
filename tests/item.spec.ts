import { Item } from '@/item'

const makeSut = (description: string, price: number, quantity: number): Item => {
  return new Item(description, price, quantity)
}

describe('Item component', () => {
  test('should create a item', () => {
    const item = makeSut('Descrição do item 1', 100, 2)

    expect(item).toBeDefined()
  })
})
