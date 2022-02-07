import { Item } from '@/Item'

const makeSut = (category: string, description: string, price: number, id?: string): Item => {
  return new Item(category, description, price, id)
}

describe('Item entity', () => {
  test('should create a item', () => {
    const item = makeSut('Categoria do item 1', 'Descrição do item 1', 2, '1')

    expect(item).toBeDefined()
  })
})
