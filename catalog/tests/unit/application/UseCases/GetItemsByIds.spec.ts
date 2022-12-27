import { ItemRepository } from '@/domain/repositories/Item'
import { GetItemsByIds } from '@/application/contracts'
import { GetItemsByIdsUseCase } from '@/application/UseCases'
import { ItemInMemoryRepository, makeItem } from '@/tests/doubles'

type SutType = {
  sut: GetItemsByIds
  itemRepository: ItemRepository
}

const makeSut = (): SutType => {
  const itemRepository = new ItemInMemoryRepository()
  const sut = new GetItemsByIdsUseCase(itemRepository)
  return { sut, itemRepository }
}

describe('GetItem UseCase', () => {
  it('should call ItemRepository with correct params', async () => {
    const { sut, itemRepository } = makeSut()
    const itemRepositorySpy = vi.spyOn(
      itemRepository,
      'getByIds'
    )

    await sut.execute({
      ids: ['any_id', 'other_id']
    })

    expect(itemRepositorySpy).toHaveBeenCalledWith(['any_id', 'other_id'])
  })

  it('should return items data from ItemRepository correctly', async () => {
    const { sut, itemRepository } = makeSut()
    await itemRepository.save(makeItem({ id: 'any_id' }))
    await itemRepository.save(makeItem({ id: 'other_id' }))

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
          width: 10,
          volume: 0.001,
          density: 10000
        },
        {
          id: 'other_id',
          depth: 10,
          description: 'any_description',
          height: 10,
          price: 10,
          weight: 10,
          width: 10,
          volume: 0.001,
          density: 10000
        }
      ]
    })
  })
})
