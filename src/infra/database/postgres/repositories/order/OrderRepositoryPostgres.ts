import { OrderRepository, SaveOrderInput, SaveOrderOutput } from '@/domain/repositories'

import { DatabaseConnection, OrderTable } from '@/infra/database'

export class OrderRepositoryPostgres implements OrderRepository {
  private readonly databaseConnection: DatabaseConnection

  constructor (databaseConnection: DatabaseConnection) {
    this.databaseConnection = databaseConnection
  }

  public async save (
    {
      order,
      orderCode
    }: SaveOrderInput
  ): Promise<SaveOrderOutput> {
    await this.databaseConnection.query<object, OrderTable>(
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
        );
      `,
      {
        cpf: order.getCPF(),
        issue_date: order.getIssueDate(),
        price: order.getTotalPrice(),
        couponId: order.getCouponId(),
        freightValue: order.getFreight(),
        orderCode
      }
    )

    return {
      orderCode
    }
  }
}
