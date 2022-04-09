import { OrderCode } from '@/domain/entities'

const makeSut = (): OrderCode => {
  const currentDate = new Date('04/19/2022')
  return new OrderCode({ currentDate })
}

describe('Order Code entity', () => {
  let orderCode: OrderCode

  beforeEach(() => {
    orderCode = makeSut()
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
})
