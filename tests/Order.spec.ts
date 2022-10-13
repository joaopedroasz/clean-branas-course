import { Order, OrderProps } from '@/Order'
import { InvalidCpfError } from '@/InvalidCPF'
import { Coupon } from '@/Coupon'
import { ForbiddenAddDuplicatedItemError } from '@/ForbiddenAddDuplicatedItem'
import { Item, ItemProps } from '@/Item'

const makeSut = (props: OrderProps): Order => new Order(props)
const makeItem = (props?: Partial<ItemProps>): Item => new Item({
  id: 'any_id',
  description: 'any_description',
  price: 10,
  heightInCm: 200,
  depthInCm: 50,
  weightInKg: 40,
  widthInCm: 100,
  ...props
})

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
    const item = makeItem()
    sut.addItem({ item, quantity: 1 })

    expect(sut.getOrderItems()).toHaveLength(1)
  })

  it('should create an order with three items', async () => {
    const item1 = makeItem({ id: 'any_item_id1' })
    const item2 = makeItem({ id: 'any_item_id2' })
    const item3 = makeItem({ id: 'any_item_id3' })
    sut.addItem({ item: item1, quantity: 1 })
    sut.addItem({ item: item2, quantity: 2 })
    sut.addItem({ item: item3, quantity: 3 })

    expect(sut.getOrderItems()).toHaveLength(3)
  })

  it('should calculate total price', () => {
    const item1 = makeItem({ id: 'any_item_id1', price: 10 })
    const item2 = makeItem({ id: 'any_item_id2', price: 20 })
    const item3 = makeItem({ id: 'any_item_id3', price: 30 })
    sut.addItem({ item: item1, quantity: 1 })
    sut.addItem({ item: item2, quantity: 2 })
    sut.addItem({ item: item3, quantity: 3 })

    expect(sut.getTotalPrice()).toBe(140)
  })

  it('should add coupon into order', () => {
    const coupon = new Coupon({ code: 'VALE20', percentage: 20 })
    sut.addCoupon(coupon)

    expect(sut.getCoupon()).toBeDefined()
  })

  it('should calculate total price with coupon discount', () => {
    const item1 = makeItem({ id: 'any_item_id1', price: 10 })
    const item2 = makeItem({ id: 'any_item_id2', price: 20 })
    const item3 = makeItem({ id: 'any_item_id3', price: 30 })
    sut.addItem({ item: item1, quantity: 1 })
    sut.addItem({ item: item2, quantity: 2 })
    sut.addItem({ item: item3, quantity: 3 })

    const coupon = new Coupon({ code: 'VALE20', percentage: 20 })
    sut.addCoupon(coupon)

    expect(sut.getTotalPrice()).toBe(112)
  })

  it('should not add same item more than once', () => {
    const sameItemId = 'any_item_id'
    const sameItem = makeItem({ id: sameItemId })
    const differentItem = makeItem({ id: 'any_item_id2' })
    sut.addItem({ item: sameItem, quantity: 1 })
    sut.addItem({ item: differentItem, quantity: 1 })
    const errorAddItem = (): void => sut.addItem({ item: sameItem, quantity: 4 })

    expect(errorAddItem).toThrowError(new ForbiddenAddDuplicatedItemError(sameItemId))
  })
})
