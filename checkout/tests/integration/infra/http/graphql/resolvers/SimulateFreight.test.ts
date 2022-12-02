import request from 'supertest'
import { ApolloServer } from '@apollo/server'

import { setupGraphQLServer } from '@/infra/http'
import { connection } from '@/infra/database'
import { deleteAll } from '@/tests/utils'

type QueryVariables = {
  cep: string
  items: Array<{
    item_id: string
    quantity: number
  }>
}

const makeQueryData = (variables?: Partial<QueryVariables>): Record<string, any> => ({
  query: `#graphql
    query ($cep: String!, $items: [SimulateFreightItems!]!) {
      simulateFreight(cep: $cep, items: $items) {
        freight
      }
    }
  `,
  variables: {
    cep: '89010025',
    items: [
      {
        item_id: 'any_item_id',
        quantity: 1
      }
    ],
    ...variables
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
    const query = makeQueryData({ items: [{ item_id: createdItemId, quantity: 1 }] })

    const response = await request(url).post('/').send(query)

    expect(response.status).toBe(200)
    expect(response.body.data.simulateFreight.freight).toBe(1041.8612481049593)
  })

  it('should return badRequest if cep is invalid', async () => {
    const query = makeQueryData({ cep: 'invalid_cep' })

    const response = await request(url).post('/').send(query)

    expect(response.status).toBe(400)
    expect(response.body.errors[0].message).toBe('HttpError: 400')
  })
})
