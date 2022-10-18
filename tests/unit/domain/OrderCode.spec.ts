import { OrderCode, OrderCodeProps } from '@/domain/entities'

const makeSut = (props?: Partial<OrderCodeProps>): OrderCode => new OrderCode({ date: new Date(), sequence: 1, ...props })

describe('Order Code', () => {
  it('should generate an code to order by date and sequence', () => {
    const orderCode = makeSut({ date: new Date('2022-09-14'), sequence: 0 })

    expect(orderCode.getCode()).toBe('202200000001')
  })
})
