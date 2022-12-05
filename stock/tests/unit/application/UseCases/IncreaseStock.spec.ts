import { StockCalculator, StockEntry, StockEntryProps } from '@/domain/models'
import { GetStockEntriesByItemIdRepository, SaveStockEntryRepository } from '@/domain/repositories'
import { IncreaseStock } from '@/application/contracts'
import { IncreaseStockUseCase } from '@/application/UseCases'

const makeStockEntry = (props?: Partial<StockEntryProps>): StockEntry => new StockEntry({
  itemId: 'any_item_id',
  quantity: 1,
  operation: 'add',
  ...props
})

const makeGetStockEntriesByItemIdRepository = (): GetStockEntriesByItemIdRepository => ({
  getByItemId: async () => [makeStockEntry()]
})

const makeSaveStockEntryRepository = (): SaveStockEntryRepository => ({
  save: async (stockEntry: StockEntry) => stockEntry
})

type SutType = {
  sut: IncreaseStock
  getStockEntriesByItemIdRepository: GetStockEntriesByItemIdRepository
  saveStockEntryRepository: SaveStockEntryRepository
}

const makeSut = (): SutType => {
  const getStockEntriesByItemIdRepository = makeGetStockEntriesByItemIdRepository()
  const saveStockEntryRepository = makeSaveStockEntryRepository()
  const sut = new IncreaseStockUseCase(
    getStockEntriesByItemIdRepository,
    saveStockEntryRepository
  )
  return {
    sut,
    getStockEntriesByItemIdRepository,
    saveStockEntryRepository
  }
}

describe('IncreaseStock UseCase', () => {
  it('should return correct values', async () => {
    const { sut } = makeSut()

    const result = await sut.execute({ itemId: 'any_id', quantity: 1 })

    expect(result).toEqual({ amountInStock: 2, itemId: 'any_id' })
  })

  it('should call GetStockEntriesByItemIdRepository with correct values', async () => {
    const { sut, getStockEntriesByItemIdRepository } = makeSut()
    const getStockEntriesByItemIdRepositorySpy = vi.spyOn(getStockEntriesByItemIdRepository, 'getByItemId')
    await sut.execute({ itemId: 'any_id', quantity: 1 })
    expect(getStockEntriesByItemIdRepositorySpy).toHaveBeenCalledWith('any_id')
  })

  it('should call StockCalculator', async () => {
    const { sut } = makeSut()
    const stockCalculatorSpy = vi.spyOn(StockCalculator.prototype, 'calculate')
    await sut.execute({ itemId: 'any_id', quantity: 1 })
    expect(stockCalculatorSpy).toHaveBeenCalledWith()
  })

  it('should call SaveStockEntryRepository with correct params', async () => {
    const { sut, saveStockEntryRepository } = makeSut()
    const saveStockRepositorySpy = vi.spyOn(saveStockEntryRepository, 'save')

    await sut.execute({ itemId: 'any_id', quantity: 1 })

    expect(saveStockRepositorySpy).toHaveBeenCalledWith(new StockEntry({ itemId: 'any_id', quantity: 1, operation: 'add' }))
  })
})
