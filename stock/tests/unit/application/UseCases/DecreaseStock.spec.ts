import { StockCalculator, StockEntry, StockEntryProps } from '@/domain/models'
import { GetStockEntriesByItemIdRepository, SaveStockEntryRepository } from '@/domain/repositories'
import { DecreaseStock } from '@/application/contracts'
import { DecreaseStockUseCase } from '@/application/UseCases'
import { EmptyStockError } from '@/application/errors'

const makeStockEntry = (props?: Partial<StockEntryProps>): StockEntry => new StockEntry({
  itemId: 'any_item_id',
  quantity: 1,
  operation: 'remove',
  ...props
})

const makeGetStockEntriesByItemId = (): GetStockEntriesByItemIdRepository => ({
  getByItemId: async (itemId: string): Promise<StockEntry[]> => ([
    makeStockEntry({ operation: 'add', quantity: 10 }),
    makeStockEntry({ operation: 'remove', quantity: 3 })
  ])
})

const makeSaveStockEntry = (): SaveStockEntryRepository => ({
  save: async (stockEntry: StockEntry): Promise<StockEntry> => stockEntry
})

type SutType = {
  sut: DecreaseStock
  getStockEntriesByItemIdRepository: GetStockEntriesByItemIdRepository
  saveStockEntryRepository: SaveStockEntryRepository
}

const makeSut = (): SutType => {
  const getStockEntriesByItemIdRepository = makeGetStockEntriesByItemId()
  const saveStockEntryRepository = makeSaveStockEntry()
  const sut = new DecreaseStockUseCase(
    getStockEntriesByItemIdRepository,
    saveStockEntryRepository
  )
  return {
    sut,
    getStockEntriesByItemIdRepository,
    saveStockEntryRepository
  }
}

describe('DecreaseStockUseCase', () => {
  it('should return correct values', async () => {
    const { sut } = makeSut()

    const result = await sut.execute({ decreaseQuantity: 1, itemId: 'any_item_id' })

    expect(result).toEqual({ amountInStock: 6, itemId: 'any_item_id' })
  })

  it('should call GetStockEntriesByItemId with correct itemId', async () => {
    const { sut, getStockEntriesByItemIdRepository } = makeSut()
    const getStockEntriesByItemIdSpy = vi.spyOn(getStockEntriesByItemIdRepository, 'getByItemId')

    await sut.execute({
      itemId: 'any_item_id',
      decreaseQuantity: 1
    })

    expect(getStockEntriesByItemIdSpy).toHaveBeenCalledWith('any_item_id')
  })

  it('should throw EmptyStockError if there is no stock entries for the given itemId', async () => {
    const { sut, getStockEntriesByItemIdRepository } = makeSut()
    vi.spyOn(getStockEntriesByItemIdRepository, 'getByItemId').mockResolvedValueOnce([])

    const error = sut.execute({ decreaseQuantity: 1, itemId: 'item_no_stock' })

    await expect(error).rejects.toThrow(new EmptyStockError('item_no_stock'))
  })

  it('should call StockCalculator.calculate', async () => {
    const { sut } = makeSut()
    const stockCalculatorSpy = vi.spyOn(StockCalculator.prototype, 'calculate')

    await sut.execute({ decreaseQuantity: 1, itemId: 'any_item_id' })

    expect(stockCalculatorSpy).toHaveBeenCalled()
  })

  it('should call SaveStockEntry with correct values', async () => {
    const { sut, saveStockEntryRepository } = makeSut()
    const saveStockEntrySpy = vi.spyOn(saveStockEntryRepository, 'save')

    await sut.execute({ decreaseQuantity: 1, itemId: 'any_item_id' })

    expect(saveStockEntrySpy).toHaveBeenCalledWith(makeStockEntry({ operation: 'remove', quantity: 1, itemId: 'any_item_id' }))
  })
})
