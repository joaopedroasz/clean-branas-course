import { PrismaClient } from '@prisma/client'

import { Coupon, Item, Order } from '@/domain/entities'
import { SaveOrderRepository } from '@/domain/repositories/Order'

export class SaveOrderPrismaRepository implements SaveOrderRepository {
  private readonly connection: PrismaClient

  constructor (connection: PrismaClient) {
    this.connection = connection
  }

  public async save (order: Order): Promise<Order> {
    const {
      cpf,
      issue_date: issueDate,
      sequence,
      order_items: orderItems,
      coupon,
      freight
    } = await this.connection.order.create({
      data: {
        cpf: order.getCPF(),
        code: order.getCode(),
        total: order.getTotalPrice(),
        coupon_code: order.getCouponCode(),
        issue_date: order.getPurchaseDate(),
        freight: order.getFreight(),
        order_items: {
          createMany: {
            data: order.getOrderItems().map(orderItem => ({
              item_id: orderItem.getItemId(),
              quantity: orderItem.getQuantity(),
              price: orderItem.calculatePrice()
            }))
          }
        }
      },
      include: {
        coupon: true,
        order_items: {
          include: {
            item: true
          }
        }
      }
    })

    const createdOrder = new Order({
      buyerCPF: cpf,
      purchaseDate: issueDate,
      sequence,
      freight: freight ?? 0
    })

    if (coupon) {
      const dueDate = coupon.expires_at ?? undefined
      const loadedCoupon = new Coupon({
        code: coupon.code,
        percentage: coupon.percentage,
        dueDate
      })
      createdOrder.addCoupon(loadedCoupon)
    }

    for (const orderItem of orderItems) {
      const item = new Item({
        id: orderItem.item.id,
        depthInCm: orderItem.item.depth,
        description: orderItem.item.description,
        heightInCm: orderItem.item.height,
        price: orderItem.item.price,
        weightInKg: orderItem.item.weight,
        widthInCm: orderItem.item.width
      })

      createdOrder.addItem({
        item,
        quantity: orderItem.quantity
      })
    }

    return createdOrder
  }
}
