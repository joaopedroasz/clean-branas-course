import { OrderCode } from '@/domain/entities'

const makeSut = (currentDate?: Date): OrderCode => {
  return new OrderCode({ currentDate })
}

describe('Order Code entity', () => {
  let orderCode: OrderCode

  beforeEach(() => {
    const currentDate = new Date('04/19/2022')
    orderCode = makeSut(currentDate)
  })

  test('should create a Order Code', () => {
    expect(orderCode).toBeDefined()
  })

  test('should generate a code', () => {
    const code = orderCode.getCode()

    const yearInCode = code.slice(0, 4)

    expect(code).toBeDefined()
    expect(yearInCode).toBe('2022')
    expect(code.length).toBe(12)
  })

  test('should generate a valid order code with default current date', () => {
    const orderCode = makeSut()
    const code = orderCode.getCode()

    expect(code).toBeDefined()
    expect(code.length).toBe(12)
  })
})
