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

  it('should throw InvalidQuantityError if quantity is equal to 0', () => {
    const sut = (): StockEntry => makeSut({ quantity: 0 })

    expect(sut).toThrowError(new InvalidQuantityError(0))
  })

  it('should return true to isIncrease if operation is add', () => {
    const sut = makeSut({ operation: 'add' })

    expect(sut.isIncrease()).toBeTruthy()
  })

  it('should return false to isIncrease if operation is remove', () => {
    const sut = makeSut({ operation: 'remove' })

    expect(sut.isIncrease()).toBeFalsy()
  })

  it('should return true to isDecrease if operation is remove', () => {
    const sut = makeSut({ operation: 'remove' })

    expect(sut.isDecrease()).toBeTruthy()
  })

  it('should return false to isDecrease if operation is add', () => {
    const sut = makeSut({ operation: 'add' })

    expect(sut.isDecrease()).toBeFalsy()
  })

  it('should remove quantity from a amount if operation is remove', () => {
    const sut = makeSut({ operation: 'remove', quantity: 2 })

    expect(sut.calculateAmount(10)).toBe(8)
  })

  it('should add quantity to a amount if operation is add', () => {
    const sut = makeSut({ operation: 'add', quantity: 2 })

    expect(sut.calculateAmount(10)).toBe(12)
  })
})
