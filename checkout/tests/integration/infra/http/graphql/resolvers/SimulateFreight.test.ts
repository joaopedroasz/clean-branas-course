import request from 'supertest'
import { ApolloServer } from '@apollo/server'

import { setupGraphQLServer } from '@/infra/http'
import { connection } from '@/infra/database'
import { deleteAll } from '@/tests/utils'

type QueryVariables = {
  fromCEP: string
  toCEP: string
  items: Array<{
    item_id: string
    quantity: number
  }>
}

const makeQueryData = (variables?: Partial<QueryVariables>): Record<string, any> => ({
  query: `#graphql
    query ($fromCEP: String!, $toCEP: String!, $items: [SimulateFreightItems!]!) {
      simulateFreight(from_cep: $fromCEP, to_cep: $toCEP, items: $items) {
        freight
      }
    }
  `,
  variables: {
    fromCEP: '20091020',
    toCEP: '03978340',
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
        depth: 50,
        density: 0.5,
        volume: 0.5
      }
    })
    const query = makeQueryData({ items: [{ item_id: createdItemId, quantity: 1 }] })

    const response = await request(url).post('/').send(query)

    expect(response.status).toBe(200)
    expect(response.body.data.simulateFreight.freight).toBe(10)
  })

  it('should return badRequest if from_cep is invalid', async () => {
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
    const query = makeQueryData({ items: [{ item_id: createdItemId, quantity: 1 }], fromCEP: 'invalid_cep' })

    const response = await request(url).post('/').send(query)

    expect(response.status).toBe(400)
    expect(response.body.errors[0].message).toBe('HttpError: 400')
  })
})
