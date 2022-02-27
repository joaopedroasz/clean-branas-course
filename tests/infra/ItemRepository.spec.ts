import { ItemRepositoryPostgres } from '@/infra/repositories'

const makeSut = (): ItemRepositoryPostgres => {
  return new ItemRepositoryPostgres()
}

describe('Postgres Item Repository', () => {
  test('should create a ItemRepository', () => {
    const itemRepository = makeSut()

    expect(itemRepository).toBeDefined()
  })
})
