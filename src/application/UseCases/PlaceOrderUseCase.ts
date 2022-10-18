import { Order } from '@/domain/entities'
import { GetItemByIdRepository } from '@/domain/repositories/Item'
import { GetCouponByCodeRepository } from '@/domain/repositories/Coupon'
import { CountOrdersRepository, SaveOrderRepository } from '@/domain/repositories/Order'
import { PlaceOrder } from '@/application/contracts'
import { PlaceOrderInputDTO, PlaceOrderOutputDTO } from '@/application/DTOs'

export class PlaceOrderUseCase implements PlaceOrder {
  private readonly getItemByIdRepository: GetItemByIdRepository
  private readonly getCouponByCodeRepository: GetCouponByCodeRepository
  private readonly saveOrderRepository: SaveOrderRepository
  private readonly countOrdersRepository: CountOrdersRepository

  constructor (
    getItemByIdRepository: GetItemByIdRepository,
    getCouponByCodeRepository: GetCouponByCodeRepository,
    saveOrderRepository: SaveOrderRepository,
    countOrdersRepository: CountOrdersRepository
  ) {
    this.getItemByIdRepository = getItemByIdRepository
    this.getCouponByCodeRepository = getCouponByCodeRepository
    this.saveOrderRepository = saveOrderRepository
    this.countOrdersRepository = countOrdersRepository
  }

  public async execute (input: PlaceOrderInputDTO): Promise<PlaceOrderOutputDTO> {
    const { buyerCPF, orderItems, couponCode, purchaseDate } = input
    const count = await this.countOrdersRepository.count()
    const order = new Order({ buyerCPF, purchaseDate, sequence: count })
    for (const orderItem of orderItems) {
      const item = await this.getItemByIdRepository.getById(orderItem.itemId)
      order.addItem({ item, quantity: orderItem.quantity })
    }
    if (couponCode) {
      const coupon = await this.getCouponByCodeRepository.getByCode(couponCode)
      order.addCoupon(coupon)
    }
    const createdOrder = await this.saveOrderRepository.save(order)
    return {
      total: order.getTotalPrice(),
      order: {
        code: createdOrder.getCode(),
        purchaseDate: createdOrder.getPurchaseDate(),
        CPF: createdOrder.getCPF()
      }
    }
  }
}
