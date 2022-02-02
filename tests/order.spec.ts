import { Order } from '@/order'
import { Item } from '@/item'

const makeSut = (
  cpf: string,
  id?: string
): Order => {
  return new Order(cpf, id)
}

describe('Order entity', () => {
  let order: Order

  beforeEach(() => {
    order = makeSut('518.858.724-61', '123')
  })

  test('should create a order', () => {
    expect(order).toBeDefined()
  })

  test('should not create a Order when CPF is invalid', () => {
    const invalidCPF = '222.222.222-22'

    expect(() => makeSut(invalidCPF, '11')).toThrowError('Invalid CPF')
  })

  test('should create a Order with many items', () => {
    order.addItem(new Item('Categoria do item 1', 'Descrição do item 1', 100, '1'), 1)
    order.addItem(new Item('Categoria do item 2', 'Descrição do item 2', 200, '2'), 2)
    order.addItem(new Item('Categoria do item 3', 'Descrição do item 3', 300, '3'), 3)

    expect(order.orderItems).toBeDefined()
  })

  test('should throw a error when add an item without id', () => {
    expect(() => order.addItem(new Item('Categoria do item 1', 'Descrição do item 1', 100), 1)).toThrowError('invalid empty id')
  })
})
