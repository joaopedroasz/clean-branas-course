import { StockEntry, StockEntryProps } from '@/domain/models'
import { GetStockEntriesByItemId } from '@/domain/repositories'
import { DecreaseStock } from '@/application/contracts'
import { DecreaseStockUseCase } from '@/application/UseCases'

const makeStockEntry = (props?: Partial<StockEntryProps>): StockEntry => new StockEntry({
  id: 'any_id',
  itemId: 'any_item_id',
  quantity: 1,
  operation: 'remove',
  ...props
})

const makeGetStockEntriesByItemId = (): GetStockEntriesByItemId => ({
  getByItemId: async (itemId: string): Promise<StockEntry[]> => ([makeStockEntry()])
})

type SutType = {
  sut: DecreaseStock
  getStockEntriesByItemId: GetStockEntriesByItemId
}

const makeSut = (): SutType => {
  const getStockEntriesByItemId = makeGetStockEntriesByItemId()
  const sut = new DecreaseStockUseCase(getStockEntriesByItemId)
  return {
    sut,
    getStockEntriesByItemId
  }
}

describe('DecreaseStockUseCase', () => {
  it('should call GetStockEntriesByItemId with correct itemId', async () => {
    const { sut, getStockEntriesByItemId } = makeSut()
    const getStockEntriesByItemIdSpy = vi.spyOn(getStockEntriesByItemId, 'getByItemId')

    await sut.execute({
      itemId: 'any_item_id',
      decreaseQuantity: 1
    })

    expect(getStockEntriesByItemIdSpy).toHaveBeenCalledWith('any_item_id')
  })
})
