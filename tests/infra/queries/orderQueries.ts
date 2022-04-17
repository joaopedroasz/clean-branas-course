import { randomUUID } from 'crypto'

import { DatabaseConnection } from '@/infra/database'

export async function createOrder (databaseConnection: DatabaseConnection, orderId?: string): Promise<void> {
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
        $<validCPF>,
        $<issue_date>,
        1,
        null,
        1,
        1
      )
    `,
    {
      id: orderId ?? randomUUID(),
      validCPF: '930.500.080-08',
      issue_date: new Date()
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
