import request from 'supertest'
import { randomUUID } from 'node:crypto'

import { DecreaseStockHttpInput, DecreaseStockRoute, ServerHttpRestExpressAdapter } from '@/infra/http'

import { connection } from '@/tests/utils'

describe('DecreaseStockRoute', () => {
  const expressServer = new ServerHttpRestExpressAdapter()
  new DecreaseStockRoute(expressServer, connection)

  beforeAll(async () => {
    await connection.$connect()
  })

  afterAll(async () => {
    await connection.stockEntry.deleteMany()
    await connection.$disconnect()
  })

  it('should return the available quantity when decrease stock', async () => {
    const itemId = randomUUID()
    await connection.stockEntry.createMany({
      data: [{
        itemId,
        operation: 'add',
        quantity: 5
      }, {
        itemId,
        operation: 'remove',
        quantity: 2
      }]
    })
    const input: DecreaseStockHttpInput = {
      itemId,
      quantity: 1
    }

    const response = await request(expressServer.server)
      .post('/stock/decrease')
      .send(input)

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      itemId,
      amount: 2
    })
  })
})
