import { OrderRepository, SaveOrderInput, SaveOrderOutput } from '@/domain/repositories'

import { DatabaseConnection } from '@/infra/database'

import { SaveOrderQueryInput, SaveOrderQueryOutput } from './types'

export class OrderRepositoryPostgres implements OrderRepository {
  private readonly databaseConnection: DatabaseConnection

  constructor (databaseConnection: DatabaseConnection) {
    this.databaseConnection = databaseConnection
  }

  public async save (
    {
      order
    }: SaveOrderInput
  ): Promise<SaveOrderOutput> {
    const [createdOrder] = await this.databaseConnection.query<
    SaveOrderQueryInput, SaveOrderQueryOutput[]
    >(
      `
        INSERT INTO orders (
          buyer_cpf,
          issue_date,
          price,
          coupon_id,
          freight_value,
          code
        )
        VALUES (
          $<cpf>,
          $<issue_date>,
          $<price>,
          $<couponId>,
          $<freightValue>,
          $<orderCode>
        )
        RETURNING id, code;
      `,
      {
        cpf: order.getCPF(),
        issue_date: order.getIssueDate(),
        price: order.getTotalPrice(),
        couponId: order.getCouponId(),
        freightValue: order.getFreight(),
        orderCode: order.getOrderCode()
      }
    )

    const { id, code } = createdOrder

    return {
      createdOrderId: id,
      createdOrderCode: code
    }
  }
}
