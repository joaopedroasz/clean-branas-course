import { Item } from '@/item'

const makeSut = (id: string, description: string, price: number): Item => {
  return new Item(id, description, price)
}

describe('Item component', () => {
  test('should create a item', () => {
    const item = makeSut('1', 'Descrição do item 1', 2)

    expect(item).toBeDefined()
  })
})
