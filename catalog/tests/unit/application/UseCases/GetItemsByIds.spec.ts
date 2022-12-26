import { GetItemsByIdsRepository } from '@/domain/repositories/Item'
import { GetItemsByIds } from '@/application/contracts'
import { GetItemsByIdsUseCase } from '@/application/UseCases'
import { GetItemsByIdsInMemoryRepository, makeItem } from '@/tests/doubles'

type SutType = {
  sut: GetItemsByIds
  getItemsByIdsRepository: GetItemsByIdsRepository
}

const makeSut = (): SutType => {
  const getItemsByIdsRepository = new GetItemsByIdsInMemoryRepository()
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

  it('should return items data from GetItemsByIdsRepository correctly', async () => {
    const { sut, getItemsByIdsRepository } = makeSut()
    vi.spyOn(getItemsByIdsRepository, 'getByIds').mockResolvedValueOnce([makeItem({ id: 'any_id' }), makeItem({ id: 'other_id' })])

    const result = await sut.execute({
      ids: ['any_id', 'other_id']
    })

    expect(result).toEqual({
      items: [
        {
          id: 'any_id',
          depth: 10,
          description: 'any_description',
          height: 10,
          price: 10,
          weight: 10,
          width: 10
        },
        {
          id: 'other_id',
          depth: 10,
          description: 'any_description',
          height: 10,
          price: 10,
          weight: 10,
          width: 10
        }
      ]
    })
  })
})
