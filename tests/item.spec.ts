import { Item } from '@/item'

const makeSut = (id: string, category: string, description: string, price: number): Item => {
  return new Item(id, category, description, price)
}

describe('Item entity', () => {
  test('should create a item', () => {
    const item = makeSut('1', 'Categoria do item 1', 'Descrição do item 1', 2)

    expect(item).toBeDefined()
  })
})
