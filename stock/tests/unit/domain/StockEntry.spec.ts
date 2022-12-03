import { StockEntry, StockEntryProps } from '@/domain/models'

const makeSut = (props?: Partial<StockEntryProps>): StockEntry => new StockEntry({
  id: 'any_id',
  itemId: 'any_item_id',
  quantity: 1,
  operation: 'add',
  ...props
})

describe('StockEntry Entity', () => {
  it('should create a valid self instance', () => {
    const sut = makeSut()

    expect(sut).toBeTruthy()
  })
})
