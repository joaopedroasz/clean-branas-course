import { Order } from '@/domain/entities'
import { CouponRepository, ItemRepository, OrderRepository, OrderItemRepository } from '@/domain/repositories'

import { PlaceOrderUseCase } from '../contracts'
import { PlaceOrderInput, PlaceOrderOutput } from '../dtos'

export class PlaceOrder implements PlaceOrderUseCase {
  private readonly itemRepository: ItemRepository
  private readonly orderRepository: OrderRepository
  private readonly couponRepository: CouponRepository
  private readonly orderItemRepository: OrderItemRepository

  constructor (
    itemRepository: ItemRepository,
    orderRepository: OrderRepository,
    couponRepository: CouponRepository,
    orderItemRepository: OrderItemRepository
  ) {
    this.itemRepository = itemRepository
    this.orderRepository = orderRepository
    this.couponRepository = couponRepository
    this.orderItemRepository = orderItemRepository
  }

  public async execute (input: PlaceOrderInput): Promise<PlaceOrderOutput> {
    const order = new Order({ cpf: input.CPF })
    for (const orderItem of input.orderItems) {
      const item = await this.itemRepository.getById(orderItem.idItem)
      order.addItem(item, orderItem.quantity)
    }

    if (input.couponId) {
      const coupon = await this.couponRepository.getById(input.couponId)
      order.addCoupon(coupon)
    }

    const { createdOrderId, createdOrderCode } = await this.orderRepository.save({ order })

    for (const orderItemInput of order.getOrderItems()) {
      await this.orderItemRepository.save({
        orderId: createdOrderId,
        orderItem: orderItemInput
      })
    }

    return {
      total: order.getTotalPrice(),
      orderId: createdOrderId,
      orderCode: createdOrderCode
    }
  }
}
