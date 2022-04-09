import { Order, Item, Coupon, OrderProperties } from '@/domain/entities'
import { ExpiredCouponError, InvalidCPFerror, InvalidEmptyIdError } from '@/domain/errors'

const makeSut = (
  {
    id, cpf
  }: OrderProperties
): Order => {
  return new Order({ id, cpf })
}

describe('Order entity', () => {
  let order: Order
  const itemFake1 = new Item({
    id: '1',
    category: 'Categoria do item 1',
    description: 'Descrição do item 1',
    price: 100,
    heightInCM: 10,
    widthInCM: 10,
    depthInCM: 10,
    weightInCM: 10
  })
  const itemFake2 = new Item({
    id: '2',
    category: 'Categoria do item 2',
    description: 'Descrição do item 2',
    price: 200,
    heightInCM: 20,
    widthInCM: 20,
    depthInCM: 20,
    weightInCM: 20
  })
  const itemFake3 = new Item({
    id: '3',
    category: 'Categoria do item 3',
    description: 'Descrição do item 3',
    price: 300,
    heightInCM: 30,
    widthInCM: 30,
    depthInCM: 30,
    weightInCM: 30
  })

  beforeEach(() => {
    order = makeSut({ id: '123', cpf: '518.858.724-61' })
  })

  test('should create a order', () => {
    expect(order).toBeDefined()
  })

  test('should not create a Order when CPF is invalid', () => {
    const invalidCPF = '222.222.222-22'
    const orderWithInvalidCPF = (): Order => makeSut({ id: '1', cpf: invalidCPF })

    expect(orderWithInvalidCPF).toThrowError(new InvalidCPFerror(invalidCPF))
  })

  test('should create a Order with many items', () => {
    order.addItem(itemFake1, 1)
    order.addItem(itemFake2, 2)
    order.addItem(itemFake3, 3)

    expect(order.orderItems).toBeDefined()
  })

  test('should throw a error when add an item without id', () => {
    const itemWithoutID = new Item({
      category: 'Categoria do item 1',
      description: 'Descrição do item 1',
      price: 100,
      heightInCM: 10,
      widthInCM: 10,
      depthInCM: 10,
      weightInCM: 10
    })

    expect(() => order.addItem(itemWithoutID, 1)).toThrowError(new InvalidEmptyIdError())
  })

  test('should calculate total price of an Order after add some items', () => {
    order.addItem(itemFake1, 1)
    order.addItem(itemFake2, 2)
    const totalPrice = order.getTotalPrice()

    expect(totalPrice).toBe(500)
  })

  test('should return 0 when calculate total price before add items', () => {
    const totalPrice = order.getTotalPrice()

    expect(totalPrice).toBe(0)
  })

  test('should calculate total price with Coupon Discount', () => {
    order.addItem(itemFake1, 1)
    order.addItem(itemFake2, 2)
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
    order.addItem(itemFake1, 1)
    order.addItem(itemFake2, 2)

    const freight = order.getFreight()

    expect(freight).toBe(500)
  })
})
