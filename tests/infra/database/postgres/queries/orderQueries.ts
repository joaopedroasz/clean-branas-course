import { randomUUID } from 'crypto'

import { createOrderType } from './types'

import { DatabaseConnection } from '@/infra/database'

export async function createOrder (databaseConnection: DatabaseConnection, orderId?: string, orderProps?: createOrderType): Promise<void> {
  const randomNumberWith12Characters = Math.floor(10000000 + Math.random() * 900000).toString()
  const orderValues: createOrderType = {
    buyer_cpf: orderProps?.buyer_cpf ?? '645.011.550-51',
    issue_date: orderProps?.issue_date ?? new Date(),
    price: orderProps?.price ?? 1,
    coupon_id: orderProps?.coupon_id,
    freight_value: orderProps?.freight_value ?? 1,
    code: orderProps?.code ?? randomNumberWith12Characters
  }

  await databaseConnection.query<object, undefined>(
    `
      INSERT INTO orders (
        id,
        buyer_cpf,
        issue_date,
        price,
        coupon_id,
        freight_value,
        code
      )
      VALUES (
        $<id>,
        $<buyer_cpf>,
        $<issue_date>,
        $<price>,
        $<coupon_id>,
        $<freight_value>,
        $<code>
      )
    `,
    {
      id: orderId ?? randomUUID(),
      buyer_cpf: orderValues.buyer_cpf,
      issue_date: orderValues.issue_date,
      price: orderValues.price,
      coupon_id: orderValues.coupon_id,
      freight_value: orderValues.freight_value,
      code: orderValues.code
    }
  )
}

export async function deleteOrder (databaseConnection: DatabaseConnection, orderId: string): Promise<void> {
  await databaseConnection.query<object, undefined>(
    `
      DELETE FROM orders
      WHERE id = $<id>
    `,
    {
      id: orderId
    }
  )
}
