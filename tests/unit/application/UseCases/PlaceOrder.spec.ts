import { Coupon, CouponProps, Item, ItemProps } from '@/domain/entities'
import { GetCouponByCodeRepository } from '@/domain/repositories/Coupon'
import { GetItemByIdRepository } from '@/domain/repositories/Item'
import { PlaceOrder } from '@/application/contracts'
import { PlaceOrderInputDTO } from '@/application/DTOs'
import { PlaceOrderUseCase } from '@/application/UseCases'

const makeCoupon = (props?: Partial<CouponProps>): Coupon => new Coupon({
  code: 'any_code',
  percentage: 10,
  dueDate: new Date('2022-10-10'),
  ...props
})

const makeItem = (props?: Partial<ItemProps>): Item => new Item({
  id: 'any_id',
  description: 'any_description',
  price: 10,
  depthInCm: 10,
  heightInCm: 10,
  weightInKg: 10,
  widthInCm: 10,
  ...props
})

const makeGetItemByIdRepository = (): GetItemByIdRepository => ({
  getById: async (id: string): Promise<Item> => makeItem({ id })
})

const makeGetCouponByCodeRepository = (): GetCouponByCodeRepository => ({
  getByCode: async (code: string): Promise<Coupon> => makeCoupon({ code })
})

type SutType = {
  sut: PlaceOrder
  getItemByIdRepository: GetItemByIdRepository
  getCouponByCodeRepository: GetCouponByCodeRepository
}

const makeSut = (): SutType => {
  const getItemByIdRepository = makeGetItemByIdRepository()
  const getCouponByCodeRepository = makeGetCouponByCodeRepository()
  const sut = new PlaceOrderUseCase(
    getItemByIdRepository,
    getCouponByCodeRepository
  )
  return {
    sut,
    getItemByIdRepository,
    getCouponByCodeRepository
  }
}

describe('PlaceOrder use case', () => {
  it('should return total value from placed order', async () => {
    const input: PlaceOrderInputDTO = {
      buyerCPF: '607.109.010-54',
      orderItems: [
        { itemId: 'any_id', quantity: 1 },
        { itemId: 'other_id', quantity: 2 }
      ]
    }
    const { sut } = makeSut()

    const result = await sut.execute(input)

    expect(result.total).toBe(330)
  })

  it('should return total value with coupon discount if coupon code provided', async () => {
    const input: PlaceOrderInputDTO = {
      buyerCPF: '607.109.010-54',
      purchaseDate: new Date('2022-10-01'),
      orderItems: [
        { itemId: 'any_id', quantity: 1 },
        { itemId: 'other_id', quantity: 2 }
      ],
      couponCode: 'any_coupon_with_10_percent_discount'
    }
    const { sut } = makeSut()

    const result = await sut.execute(input)

    expect(result.total).toBe(297)
  })

  it('should call GetItemByIdRepository correctly', async () => {
    const input: PlaceOrderInputDTO = {
      buyerCPF: '607.109.010-54',
      orderItems: [
        { itemId: 'any_id', quantity: 1 },
        { itemId: 'other_id', quantity: 2 }
      ]
    }
    const { sut, getItemByIdRepository } = makeSut()
    const getItemByIdRepositorySpy = vi.spyOn(getItemByIdRepository, 'getById')

    await sut.execute(input)

    expect(getItemByIdRepositorySpy).toHaveBeenCalledTimes(2)
    expect(getItemByIdRepositorySpy).toHaveBeenCalledWith('any_id')
    expect(getItemByIdRepositorySpy).toHaveBeenCalledWith('other_id')
  })

  it('should call GetCouponByCodeRepository correctly', async () => {
    const input: PlaceOrderInputDTO = {
      buyerCPF: '607.109.010-54',
      orderItems: [
        { itemId: 'any_id', quantity: 1 },
        { itemId: 'other_id', quantity: 2 }
      ],
      couponCode: 'any_coupon_with_10_percent_discount'
    }
    const { sut, getCouponByCodeRepository } = makeSut()
    const getCouponByCodeRepositorySpy = vi.spyOn(getCouponByCodeRepository, 'getByCode')

    await sut.execute(input)

    expect(getCouponByCodeRepositorySpy).toHaveBeenCalledTimes(1)
    expect(getCouponByCodeRepositorySpy).toHaveBeenCalledWith('any_coupon_with_10_percent_discount')
  })
})
