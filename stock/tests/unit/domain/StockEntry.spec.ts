import { StockEntry, StockEntryProps } from '@/domain/models'
import { InvalidQuantityError } from '@/domain/errors'

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

  it('should throw InvalidQuantityError if quantity is less than 0', () => {
    const sut = (): StockEntry => makeSut({ quantity: -1 })

    expect(sut).toThrowError(new InvalidQuantityError(-1))
  })
})
