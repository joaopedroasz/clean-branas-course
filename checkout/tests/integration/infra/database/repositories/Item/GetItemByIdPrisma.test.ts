import { GetItemByIdRepository } from '@/domain/repositories/Item'
import { ItemNotFoundError } from '@/domain/errors'
import { GetItemByIdPrismaRepository, connection } from '@/infra/database'
import { deleteAll } from '@/tests/utils'

type SutTypes = {
  sut: GetItemByIdRepository
}

const makeSut = (): SutTypes => ({
  sut: new GetItemByIdPrismaRepository(connection)
})

describe('GetItemByIdPrismaRepository', () => {
  afterAll(async () => {
    await deleteAll(connection)
  })

  it('should return an item by id', async () => {
    const { sut } = makeSut()
    const { id: createdItemId } = await connection.item.create({
      data: {
        description: 'any_description',
        price: 10,
        depth: 1,
        height: 1,
        weight: 1,
        width: 1
      }
    })

    const item = await sut.getById(createdItemId)

    expect(item).toBeTruthy()
  })

  it('should throw ItemNotFoundError if item does not exist', async () => {
    const { sut } = makeSut()

    const error = sut.getById('invalid_id')

    await expect(error).rejects.toThrowError(new ItemNotFoundError({
      targetProperty: 'id',
      targetValue: 'invalid_id'
    }))
  })
})
