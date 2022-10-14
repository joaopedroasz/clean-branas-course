import { GetCouponByCodeRepository } from './GetCouponByCodeRepository'
import { GetItemByIdRepository } from './GetItemByIdRepository'
import { Order } from './Order'
import { PlaceOrder } from './PlaceOrder'
import { PlaceOrderInputDTO } from './PlaceOrderInput'
import { PlaceOrderOutputDTO } from './PlaceOrderOutput'

export class PlaceOrderUseCase implements PlaceOrder {
  private readonly getItemByIdRepository: GetItemByIdRepository
  private readonly getCouponByCodeRepository: GetCouponByCodeRepository

  constructor (
    getItemByIdRepository: GetItemByIdRepository,
    getCouponByCodeRepository: GetCouponByCodeRepository
  ) {
    this.getItemByIdRepository = getItemByIdRepository
    this.getCouponByCodeRepository = getCouponByCodeRepository
  }

  public async execute (input: PlaceOrderInputDTO): Promise<PlaceOrderOutputDTO> {
    const { buyerCPF, orderItems } = input
    const order = new Order({ buyerCPF })
    for (const orderItem of orderItems) {
      const item = await this.getItemByIdRepository.getById(orderItem.itemId)
      order.addItem({ item, quantity: orderItem.quantity })
    }
    if (input.couponCode) {
      const coupon = await this.getCouponByCodeRepository.getByCode(input.couponCode)
      order.addCoupon(coupon)
    }
    return {
      total: order.getTotalPrice()
    }
  }
}
