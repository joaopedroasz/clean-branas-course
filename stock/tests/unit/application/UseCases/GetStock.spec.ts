import { StockCalculator, StockEntry, StockEntryProps } from '@/domain/models'
import { GetStockEntriesByItemIdRepository } from '@/domain/repositories'
import { GetStock } from '@/application/contracts'
import { GetStockUseCase } from '@/application/UseCases'

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

type SutType = {
  sut: GetStock
  getStockEntriesByItemIdRepository: GetStockEntriesByItemIdRepository
}

const makeSut = (): SutType => {
  const getStockEntriesByItemIdRepository = makeGetStockEntriesByItemId()
  const sut = new GetStockUseCase(getStockEntriesByItemIdRepository)
  return {
    sut,
    getStockEntriesByItemIdRepository
  }
}

describe('GetStock UseCase', () => {
  it('should return the correct quantity', async () => {
    const { sut } = makeSut()

    const result = await sut.execute({ itemId: 'any_id' })

    expect(result).toEqual({ quantity: 7 })
  })

  it('should call GetStockEntriesByItemIdRepository with correct values', async () => {
    const { sut, getStockEntriesByItemIdRepository } = makeSut()
    const getStockEntriesByItemIdRepositorySpy = vi.spyOn(
      getStockEntriesByItemIdRepository,
      'getByItemId'
    )
    await sut.execute({ itemId: 'any_id' })
    expect(getStockEntriesByItemIdRepositorySpy).toHaveBeenCalledWith('any_id')
  })

  it('should call StockCalculator', async () => {
    const { sut } = makeSut()
    const stockCalculatorSpy = vi.spyOn(StockCalculator.prototype, 'calculate')

    await sut.execute({ itemId: 'any_id' })

    expect(stockCalculatorSpy).toHaveBeenCalled()
  })
})
