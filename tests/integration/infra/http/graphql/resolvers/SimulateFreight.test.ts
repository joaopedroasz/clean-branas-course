import request from 'supertest'
import { ApolloServer } from '@apollo/server'

import { setupGraphQLServer } from '@/infra/http'
import { connection } from '@/infra/database'
import { deleteAll } from '@/tests/utils'

const makeQueryData = (id: string): Record<string, any> => ({
  query: `#graphql
    query ($cep: String!, $items: [SimulateFreightItems!]!) {
      simulateFreight(cep: $cep, items: $items) {
        freight
      }
    }
  `,
  variables: {
    cep: '59022390',
    items: [
      {
        item_id: id,
        quantity: 1
      }
    ]
  }
})

describe('SimulateFreightQueryResolver', () => {
  let server: ApolloServer
  let url: string

  beforeAll(async () => {
    ({ url, server } = await setupGraphQLServer(0))
  })

  afterAll(async () => {
    await server.stop()
    await deleteAll(connection)
  })

  it('should return total freight', async () => {
    const { id: createdItemId } = await connection.item.create({
      data: {
        description: 'Fridge',
        price: 1000,
        weight: 40,
        height: 40,
        width: 100,
        depth: 50
      }
    })
    const query = makeQueryData(createdItemId)

    const response = await request(url).post('/').send(query)

    expect(response.status).toBe(200)
    expect(response.body.data.simulateFreight.freight).toBe(74.9144193385723)
  })
})
