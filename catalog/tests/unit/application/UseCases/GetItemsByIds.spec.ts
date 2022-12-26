import { GetItemsByIdsRepository } from '@/domain/repositories/Item'
import { GetItemsByIds } from '@/application/contracts'
import { GetItemsByIdsUseCase } from '@/application/UseCases'
import { ItemRepository } from '@/tests/doubles'

type SutType = {
  sut: GetItemsByIds
  getItemsByIdsRepository: GetItemsByIdsRepository
}

const makeSut = (): SutType => {
  const getItemsByIdsRepository = new ItemRepository()
  const sut = new GetItemsByIdsUseCase(getItemsByIdsRepository)
  return { sut, getItemsByIdsRepository }
}

describe('GetItem UseCase', () => {
  it('should call GetItemsByIdsRepository with correct params', async () => {
    const { sut, getItemsByIdsRepository } = makeSut()
    const getItemsByIdsRepositorySpy = vi.spyOn(
      getItemsByIdsRepository,
      'getByIds'
    )

    await sut.execute({
      ids: ['any_id', 'other_id']
    })

    expect(getItemsByIdsRepositorySpy).toHaveBeenCalledWith(['any_id', 'other_id'])
  })
})
