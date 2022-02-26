import { Order, Item, Coupon } from '@/domain/entities'
import { ExpiredCouponError, InvalidEmptyID } from '@/domain/entities/errors'

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
    order.addItem(new Item('Categoria do item 1', 'Descrição do item 1', 100, 10, 10, 10, 10, '1'), 1)
    order.addItem(new Item('Categoria do item 2', 'Descrição do item 2', 200, 20, 20, 20, 20, '2'), 2)
    order.addItem(new Item('Categoria do item 3', 'Descrição do item 3', 300, 30, 30, 30, 30, '3'), 3)

    expect(order.orderItems).toBeDefined()
  })

  test('should throw a error when add an item without id', () => {
    const itemWithoutID = new Item('Categoria do item 1', 'Descrição do item 1', 100, 10, 10, 10, 10)

    expect(() => order.addItem(itemWithoutID, 1)).toThrowError(new InvalidEmptyID())
  })

  test('should calculate total price of an Order after add some items', () => {
    order.addItem(new Item('Categoria do item 1', 'Descrição do item 1', 100, 10, 10, 10, 10, '1'), 1)
    order.addItem(new Item('Categoria do item 2', 'Descrição do item 2', 200, 20, 20, 20, 20, '2'), 2)
    const totalPrice = order.getTotalPrice()

    expect(totalPrice).toBe(500)
  })

  test('should return 0 when calculate total price before add items', () => {
    const totalPrice = order.getTotalPrice()

    expect(totalPrice).toBe(0)
  })

  test('should calculate total price with Coupon Discount', () => {
    order.addItem(new Item('Categoria do item 1', 'Descrição do item 1', 100, 10, 10, 10, 10, '1'), 1)
    order.addItem(new Item('Categoria do item 2', 'Descrição do item 2', 200, 20, 20, 20, 20, '2'), 2)
    order.addCoupon(new Coupon({
      code: 'Código do cupom 1',
      percentage: 25
    }))

    const totalPrice = order.getTotalPrice()

    expect(totalPrice).toBe(375)
  })

  test('should not add a expired Coupon', () => {
    const currentDate = new Date('02/13/2022')
    const expiredDate = new Date('02/06/2022')

    const addExpiredCoupon = (): void => order.addCoupon(
      new Coupon({
        code: 'Código do cupom 1',
        percentage: 25,
        currentDate,
        expiresIn: expiredDate
      })
    )

    expect(addExpiredCoupon).toThrowError(new ExpiredCouponError(expiredDate))
  })

  test('should calculate freight', () => {
    order.addItem(new Item('Categoria do Item 1', 'Descrição do Item 1', 100, 200, 100, 50, 40, '1'), 1)
    order.addItem(new Item('Categoria do Item 2', 'Descrição do Item 2', 30, 10, 10, 10, 0.9, '2'), 2)

    const freight = order.getFreight()

    expect(freight).toBe(410)
  })
})
