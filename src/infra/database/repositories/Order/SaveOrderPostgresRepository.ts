import { PrismaClient } from '@prisma/client'

import { Coupon, Item, Order } from '@/domain/entities'
import { SaveOrderRepository } from '@/domain/repositories/Order'

export class SaveOrderPostgresRepository implements SaveOrderRepository {
  private readonly connection: PrismaClient

  constructor (connection: PrismaClient) {
    this.connection = connection
  }

  public async save (order: Order): Promise<Order> {
    const {
      cpf,
      issue_date: issueDate,
      sequence,
      OrderItem,
      coupon
    } = await this.connection.order.create({
      data: {
        cpf: order.getCPF(),
        code: order.getCode(),
        total: order.getTotalPrice(),
        coupon_code: order.getCouponCode(),
        issue_date: order.getPurchaseDate(),
        freight: order.getFreightPrice(),
        OrderItem: {
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
        OrderItem: {
          include: {
            item: true
          }
        }
      }
    })

    const createdOrder = new Order({
      buyerCPF: cpf,
      purchaseDate: issueDate,
      sequence
    })

    let loadedCoupon: Coupon | undefined

    if (coupon) {
      const dueDate = coupon.expires_at ?? undefined
      loadedCoupon = new Coupon({
        code: coupon.code,
        percentage: coupon.percentage,
        dueDate
      })
      createdOrder.addCoupon(loadedCoupon)
    }

    for (const orderItem of OrderItem) {
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
