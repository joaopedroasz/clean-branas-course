import request from 'supertest'

import { GetItemsByIdsRoute, ServerHttpRestExpressAdapter } from '@/infra/http'
import { connection, deleteAll } from '@/tests/utils'

describe('GetItemsByIds Route', () => {
  const express = new ServerHttpRestExpressAdapter()
  new GetItemsByIdsRoute(express, connection)

  beforeAll(async () => {
    await connection.$connect()
    await deleteAll(connection)
  })

  afterAll(async () => {
    await connection.$disconnect()
  })

  it('should return an array of items by ids', async () => {
    const createdItems = await connection.item.create({
      data: {
        description: 'Item 1',
        depth: 10,
        height: 20,
        price: 100,
        weight: 1000,
        width: 15
      }
    })

    const response = await request(express.server).get('/items').query({
      itemsIds: createdItems.id
    })

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      items: [{
        id: createdItems.id,
        description: createdItems.description,
        depth: createdItems.depth,
        height: createdItems.height,
        price: createdItems.price,
        weight: createdItems.weight,
        width: createdItems.width
      }]
    })
  })
})
