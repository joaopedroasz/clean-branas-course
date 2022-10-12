import { Order, OrderProps } from '@/Order'
import { InvalidCpfError } from '@/InvalidCPF'
import { Coupon } from '@/Coupon'
import { ForbiddenAddDuplicatedItemError } from '@/ForbiddenAddDuplicatedItem'

const makeSut = (props: OrderProps): Order => new Order(props)

describe('Order', () => {
  let sut: Order

  beforeEach(() => {
    sut = makeSut({ buyerCPF: '607.109.010-54' })
  })

  it('should not create an order with invalid CPF', () => {
    const invalidCPF = '705.738.222-72'
    const sut = (): Order => makeSut({ buyerCPF: invalidCPF })

    expect(sut).toThrow(new InvalidCpfError(invalidCPF))
  })

  it('should create an order with valid CPF', () => {
    expect(sut).toBeDefined()
  })

  it('should add OrderItems into Order', () => {
    sut.addItem({ itemId: 'any_id', price: 1, quantity: 1 })

    expect(sut.getOrderItems()).toHaveLength(1)
  })

  it('should create an order with three items', async () => {
    sut.addItem({ itemId: 'any_item_id1', price: 10, quantity: 1 })
    sut.addItem({ itemId: 'any_item_id2', price: 20, quantity: 2 })
    sut.addItem({ itemId: 'any_item_id3', price: 30, quantity: 3 })

    expect(sut.getOrderItems()).toHaveLength(3)
  })

  it('should calculate total price', () => {
    sut.addItem({ itemId: 'any_item_id1', price: 10, quantity: 1 })
    sut.addItem({ itemId: 'any_item_id2', price: 20, quantity: 2 })
    sut.addItem({ itemId: 'any_item_id3', price: 30, quantity: 3 })

    expect(sut.getTotalPrice()).toBe(140)
  })

  it('should add coupon into order', () => {
    const coupon = new Coupon({ code: 'VALE20', percentage: 20 })
    sut.addCoupon(coupon)

    expect(sut.getCoupon()).toBeDefined()
  })

  it('should calculate total price with coupon discount', () => {
    sut.addItem({ itemId: 'any_item_id1', price: 10, quantity: 1 })
    sut.addItem({ itemId: 'any_item_id2', price: 20, quantity: 2 })
    sut.addItem({ itemId: 'any_item_id3', price: 30, quantity: 3 })

    const coupon = new Coupon({ code: 'VALE20', percentage: 20 })
    sut.addCoupon(coupon)

    expect(sut.getTotalPrice()).toBe(112)
  })

  it('should not add same item more than once', () => {
    const sameItemId = 'any_item_id'
    sut.addItem({ itemId: 'any_item_id', price: 10, quantity: 1 })
    sut.addItem({ itemId: 'any_item_id2', price: 20, quantity: 1 })
    const errorAddItem = (): void => sut.addItem({ itemId: 'any_item_id', price: 10, quantity: 4 })

    expect(errorAddItem).toThrowError(new ForbiddenAddDuplicatedItemError(sameItemId))
  })
})
