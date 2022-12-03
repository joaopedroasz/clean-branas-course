import { StockCalculator, StockEntry, StockEntryProps } from '@/domain/models'

const makeStockEntry = (props?: Partial<StockEntryProps>): StockEntry => new StockEntry({
  id: 'any_id',
  itemId: 'any_item_id',
  quantity: 1,
  operation: 'add',
  ...props
})

const makeSut = (props?: StockEntry[]): StockCalculator => new StockCalculator([
  makeStockEntry({ operation: 'add', quantity: 10 }),
  makeStockEntry({ operation: 'remove', quantity: 2 }),
  makeStockEntry({ operation: 'remove', quantity: 5 }),
  ...(props ?? [])
])

describe('StockCalculator Entity', () => {
  it('should return stock from item', () => {
    const sut = makeSut()

    expect(sut.calculate()).toBe(3)
  })
})
