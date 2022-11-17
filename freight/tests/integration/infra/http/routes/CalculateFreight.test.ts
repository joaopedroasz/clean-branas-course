import request from 'supertest'

import { CalculateFreightRoute, ServerHttpRestExpressAdapter } from '@/infra/http'

describe('CalculateFreight Route', () => {
  const server = new ServerHttpRestExpressAdapter()
  new CalculateFreightRoute(server)

  it('should return total freight', async () => {
    const input = {
      origin: '59022-390',
      destination: '23812-310',
      orderItems: [
        {
          volume: 0.5,
          density: 0.5,
          quantity: 3
        },
        {
          volume: 1,
          density: 1,
          quantity: 1
        }
      ]
    }

    const response = await request(server.express).post('/calculate-freight').send(input)

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      freight: 36.89204407723591
    })
  })
})
