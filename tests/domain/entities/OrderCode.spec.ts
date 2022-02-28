import { OrderCode } from '@/domain/entities'

const makeSut = (): OrderCode => {
  return new OrderCode()
}

describe('Order Code entity', () => {
  let orderCode: OrderCode

  beforeEach(() => {
    orderCode = makeSut()
  })

  test('should create a Order Code', () => {
    expect(orderCode).toBeDefined()
  })
})
