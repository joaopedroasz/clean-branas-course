import { ItemRepository } from '@/domain/repositories'
import { SimulateFreight } from '@/application/use-cases'
import { SimulateFreightInputProperties } from '@/application/dtos'

import { ItemRepositoryStub } from '@/tests/stub/repositories'

type makeSutTypes = {
  simulateFreight: SimulateFreight
  itemRepository: ItemRepository
}

const makeSut = (): makeSutTypes => {
  const itemRepository = new ItemRepositoryStub()
  const simulateFreight = new SimulateFreight(itemRepository)

  return {
    simulateFreight,
    itemRepository
  }
}

describe('Simulate Freight use case', () => {
  const simulateOrderInput: SimulateFreightInputProperties[] = [
    {
      itemId: '1',
      quantity: 1
    },
    {
      itemId: '2',
      quantity: 2
    },
    {
      itemId: '2',
      quantity: 3
    }
  ]

  test('should create a simulate freight', () => {
    const { simulateFreight } = makeSut()

    expect(simulateFreight).toBeDefined()
  })

  test('should execute simulate freight use case', async () => {
    const { simulateFreight } = makeSut()

    const { totalValue } = await simulateFreight.execute(simulateOrderInput)

    expect(totalValue).toBe(600)
  })
})
