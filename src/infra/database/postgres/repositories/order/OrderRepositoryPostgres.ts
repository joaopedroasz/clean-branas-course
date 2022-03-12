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
          price,
          coupon_id,
          freight_value,
          code
        )
        VALUES (
          $<cpf>,
          $<price>,
          $<couponId>,
          $<freightValue>,
          $<orderCode>
        );
      `,
      {
        cpf: order.cpf.value,
        price: order.getTotalPrice(),
        couponId: order.coupon?.id,
        freightValue: order.getFreight(),
        orderCode
      }
    )

    return {
      orderCode
    }
  }
}
