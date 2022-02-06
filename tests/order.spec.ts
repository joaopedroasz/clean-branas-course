import { Order } from '@/order'
import { Item } from '@/item'
import { Coupon } from '@/coupon'

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

  test('should calculate total price of an Order after add some items', () => {
    order.addItem(new Item('Categoria do item 1', 'Descrição do item 1', 100, '1'), 1)
    order.addItem(new Item('Categoria do item 2', 'Descrição do item 2', 200, '2'), 2)
    const totalPrice = order.getTotalPrice()

    expect(totalPrice).toBe(500)
  })

  test('should return 0 when calculate total price before add items', () => {
    const totalPrice = order.getTotalPrice()

    expect(totalPrice).toBe(0)
  })

  test('should calculate total price with Coupon Discount', () => {
    order.addItem(new Item('Categoria do item 1', 'Descrição do item 1', 100, '1'), 1)
    order.addItem(new Item('Categoria do item 2', 'Descrição do item 2', 200, '2'), 2)
    order.addCoupon(new Coupon('Código do cupom 1', 25))

    const totalPrice = order.getTotalPrice()

    expect(totalPrice).toBe(375)
  })
})
