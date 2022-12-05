import { StockEntry, StockEntryProps } from '@/domain/models'
import { GetStockEntriesByItemIdRepository } from '@/domain/repositories'
import { IncreaseStock } from '@/application/contracts'
import { IncreaseStockUseCase } from '@/application/UseCases'

const makeStockEntry = (props?: Partial<StockEntryProps>): StockEntry => new StockEntry({
  itemId: 'any_item_id',
  quantity: 1,
  operation: 'remove',
  ...props
})

const makeGetStockEntriesByItemIdRepository = (): GetStockEntriesByItemIdRepository => ({
  getByItemId: async () => [makeStockEntry()]
})

type SutType = {
  sut: IncreaseStock
  getStockEntriesByItemIdRepository: GetStockEntriesByItemIdRepository
}

const makeSut = (): SutType => {
  const getStockEntriesByItemIdRepository = makeGetStockEntriesByItemIdRepository()
  const sut = new IncreaseStockUseCase(getStockEntriesByItemIdRepository)
  return {
    sut,
    getStockEntriesByItemIdRepository
  }
}

describe('IncreaseStock UseCase', () => {
  it('should call GetStockEntriesByItemIdRepository with correct values', async () => {
    const { sut, getStockEntriesByItemIdRepository } = makeSut()
    const getStockEntriesByItemIdRepositorySpy = vi.spyOn(getStockEntriesByItemIdRepository, 'getByItemId')
    await sut.execute({ itemId: 'any_id', quantity: 1 })
    expect(getStockEntriesByItemIdRepositorySpy).toHaveBeenCalledWith('any_id')
  })
})
