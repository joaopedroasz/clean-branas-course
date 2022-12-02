import { Coupon, OrderProps, Order, Item, ItemProps } from '@/domain/entities'
import { ForbiddenAddDuplicatedItemError, InvalidCpfError } from '@/domain/errors'

const makeSut = (props?: Partial<OrderProps>): Order => new Order({
  buyerCPF: '607.109.010-54',
  purchaseDate: new Date('2022-10-17'),
  sequence: 0,
  ...props
})

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
    sut = makeSut()
  })

  it('should not create an order with invalid CPF', () => {
    const invalidCPF = '705.738.222-72'
    const sut = (): Order => makeSut({ buyerCPF: invalidCPF })

    expect(sut).toThrow(new InvalidCpfError(invalidCPF))
  })

  it('should create an order with valid CPF', () => {
    const validCPF = '858.620.912-03'
    const sut = makeSut({ buyerCPF: validCPF })

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

    expect(sut.getCouponCode()).toBe('VALE20')
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

  it('should not apply an expired coupon', () => {
    const coupon = new Coupon({ code: 'VALE20', percentage: 20, dueDate: new Date('2022-10-01') })
    sut.addCoupon(coupon)

    expect(sut.getCouponCode()).toBeUndefined()
  })

  it('should create a order and get code', () => {
    const order = makeSut({ purchaseDate: new Date('2022-10-18'), sequence: 0 })
    const item1 = makeItem({ id: 'any_item_1' })
    const item2 = makeItem({ id: 'any_item_2' })
    const item3 = makeItem({ id: 'any_item_3' })
    sut.addItem({ item: item1, quantity: 1 })
    sut.addItem({ item: item2, quantity: 1 })
    sut.addItem({ item: item3, quantity: 3 })

    expect(order.getCode()).toBe('202200000001')
  })

  it('should return CPF', () => {
    const cpf = '858.620.912-03'
    const sut = makeSut({ buyerCPF: cpf })

    expect(sut.getCPF()).toBe(cpf)
  })

  it('should return purchase date', () => {
    const purchaseDate = new Date('2022-10-18')
    const sut = makeSut({ purchaseDate })

    expect(sut.getPurchaseDate()).toBe(purchaseDate)
  })

  it('should return coupon code', () => {
    const coupon = new Coupon({ code: 'VALE20', percentage: 20 })
    sut.addCoupon(coupon)

    expect(sut.getCouponCode()).toBe('VALE20')
  })

  it('should get freight', () => {
    expect(sut.getFreight()).toBe(0)
  })

  it('should return total price with freight if it is more than zero', () => {
    const sut = makeSut({ freight: 10 })
    const item1 = makeItem({ id: 'any_item_id1', price: 10 })
    const item2 = makeItem({ id: 'any_item_id2', price: 20 })
    const item3 = makeItem({ id: 'any_item_id3', price: 30 })
    sut.addItem({ item: item1, quantity: 1 })
    sut.addItem({ item: item2, quantity: 2 })
    sut.addItem({ item: item3, quantity: 3 })

    expect(sut.getTotalPrice()).toBe(150)
  })

  it('should set freight', () => {
    const sut = makeSut({ freight: 0 })
    sut.setFreight(10)

    expect(sut.getFreight()).toBe(10)
  })
})
