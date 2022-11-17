import { Coupon, CouponProps, Item, ItemProps, Order } from '@/domain/entities'
import { SaveOrderRepository } from '@/domain/repositories/Order'
import { SaveOrderPrismaRepository, connection } from '@/infra/database'
import { deleteAll } from '@/tests/utils'

const makeItem = (props?: Partial<ItemProps>): Item => new Item({
  id: 'any_id',
  description: 'any_description',
  price: 1,
  depthInCm: 1,
  heightInCm: 1,
  weightInKg: 1,
  widthInCm: 1,
  ...props
})

const makeCoupon = (props?: Partial<CouponProps>): Coupon => new Coupon({
  code: 'any_code',
  percentage: 1,
  dueDate: new Date('2022-10-21'),
  ...props
})

describe('SaveOrderPrismaRepository', () => {
  let sut: SaveOrderRepository

  beforeAll(async () => {
    sut = new SaveOrderPrismaRepository(connection)
  })

  afterAll(async () => {
    await deleteAll(connection)
  })

  it('should save an order', async () => {
    const order = await sut.save(new Order({
      buyerCPF: '74699434126',
      sequence: 1,
      purchaseDate: new Date('2022-10-20T14:00:00')
    }))

    expect(order).toBeDefined()
  })

  it('should save an order and return order items', async () => {
    const item1 = makeItem({ id: 'any_id_1' })
    await connection.item.create({
      data: {
        id: item1.getId(),
        description: item1.getDescription(),
        price: item1.getPrice(),
        depth: item1.getDepth(),
        height: item1.getHeight(),
        weight: item1.getWeight(),
        width: item1.getWidth()
      }
    })
    const item2 = makeItem({ id: 'any_id_2' })
    await connection.item.create({
      data: {
        id: item2.getId(),
        description: item2.getDescription(),
        price: item2.getPrice(),
        depth: item2.getDepth(),
        height: item2.getHeight(),
        weight: item2.getWeight(),
        width: item2.getWidth()
      }
    })
    const order = new Order({
      buyerCPF: '67440503112',
      sequence: 2,
      purchaseDate: new Date('2022-10-20T14:00:00')
    })
    order.addItem({ item: item1, quantity: 1 })
    order.addItem({ item: item2, quantity: 2 })

    const createdOrder = await sut.save(order)

    expect(createdOrder.getOrderItems()).toBeDefined()
    expect(createdOrder.getOrderItems()).toHaveLength(2)
  })

  it('should save an order and return coupon if it provided', async () => {
    const couponCode = 'any_code_coupon'
    const coupon = makeCoupon({ code: couponCode })
    await connection.coupon.create({
      data: {
        code: coupon.getCode(),
        percentage: coupon.getPercentage(),
        expires_at: coupon.getDueDate()
      }
    })
    const order = new Order({
      buyerCPF: '80978447298',
      sequence: 3,
      purchaseDate: new Date('2022-10-20T14:00:00')
    })
    order.addCoupon(coupon)

    const createdOrder = await sut.save(order)

    expect(createdOrder.getCouponCode()).toBe(couponCode)
  })

  it('should not return coupon if it not provided', async () => {
    const order = new Order({
      buyerCPF: '23411653701',
      sequence: 4,
      purchaseDate: new Date('2022-10-20T14:00:00')
    })

    const createdOrder = await sut.save(order)

    expect(createdOrder.getCouponCode()).toBeUndefined()
  })

  it('should save an order with coupon with no expired date', async () => {
    const couponCode = 'any_code_coupon_no_expired_date'
    const coupon = makeCoupon({ code: couponCode, dueDate: undefined })
    await connection.coupon.create({
      data: {
        code: coupon.getCode(),
        percentage: coupon.getPercentage(),
        expires_at: null
      }
    })
    const order = new Order({
      buyerCPF: '64836366364',
      sequence: 5,
      purchaseDate: new Date('2022-10-20T14:00:00')
    })
    order.addCoupon(coupon)

    const createdOrder = await sut.save(order)

    expect(createdOrder.getCouponCode()).toBe(couponCode)
  })

  it('should return order with freight', async () => {
    const freight = 10
    const order = new Order({
      buyerCPF: '64836366364',
      sequence: 6,
      purchaseDate: new Date('2022-10-20T14:00:00'),
      freight
    })

    const createdOrder = await sut.save(order)

    expect(createdOrder.getFreight()).toBe(freight)
  })

  it('should return order with freight equals 0 if not exists', async () => {
    const order = new Order({
      buyerCPF: '64836366364',
      sequence: 7,
      purchaseDate: new Date('2022-10-20T14:00:00')
    })

    const createdOrder = await sut.save(order)

    expect(createdOrder.getFreight()).toBe(0)
  })
})
