import { ItemRepository } from '@/domain/repositories'
import { ItemNotFoundError } from '@/domain/errors'

import { SimulateFreightUseCase } from '@/application/contracts'
import { SimulateFreight } from '@/application/use-cases'
import { SimulateFreightInputProperties, SimulateFreightOutput } from '@/application/dtos'

import { DatabaseConnection, DatabaseConnectionAdapter, ItemRepositoryPostgres } from '@/infra/database'

type makeSutType = {
  simulateFreight: SimulateFreightUseCase
  databaseConnection: DatabaseConnection
  itemRepository: ItemRepository
}

const makeSut = (): makeSutType => {
  const databaseConnection = new DatabaseConnectionAdapter()
  const itemRepository = new ItemRepositoryPostgres(databaseConnection)
  const simulateFreight = new SimulateFreight(itemRepository)

  return {
    simulateFreight,
    itemRepository,
    databaseConnection
  }
}

describe('Simulate Freight use case', () => {
  const { simulateFreight, itemRepository } = makeSut()

  const simulateFreightInput: SimulateFreightInputProperties[] = [
    {
      itemId: '1',
      quantity: 1
    },
    {
      itemId: '2',
      quantity: 2
    },
    {
      itemId: '3',
      quantity: 3
    }
  ]

  test('should throw an error when itemRepository throws an error', async () => {
    const invalidId = 'invalid_id'
    const itemNotFoundError = new ItemNotFoundError(invalidId)
    jest.spyOn(itemRepository, 'getById').mockImplementationOnce(() => {
      throw itemNotFoundError
    })

    const simulateFreightError = async (): Promise<SimulateFreightOutput> => await simulateFreight.execute(simulateFreightInput)

    await expect(simulateFreightError).rejects.toThrowError(itemNotFoundError)
  })
})
