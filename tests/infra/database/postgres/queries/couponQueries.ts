import { randomUUID } from 'crypto'

import { DatabaseConnection } from '@/infra/database'

export async function createCoupon (databaseConnection: DatabaseConnection, couponId?: string): Promise<void> {
  await databaseConnection.query<object, undefined>(
    `
      INSERT INTO coupons (
        id,
        code,
        percentage,
        expire_date
      )
      VALUES (
        $<id>,
        'código válido',
        10,
        $<expire_date>
      )
    `,
    {
      id: couponId ?? randomUUID(),
      expire_date: new Date()
    }
  )
}

export async function deleteCoupon (databaseConnection: DatabaseConnection, couponId: string): Promise<void> {
  await databaseConnection.query<object, undefined>(
    `
      DELETE FROM coupons
      WHERE id = $<id>
    `,
    {
      id: couponId
    }
  )
}
