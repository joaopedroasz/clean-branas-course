import { Order, OrderProps } from '@/domain/entities'
import { CountOrdersRepository } from '@/domain/repositories/Order'
import { CountOrdersPrismaRepository, connection } from '@/infra/database'
import { deleteAll } from '@/tests/utils'

const makeOrder = (props?: Partial<OrderProps>): Order => new Order({
  buyerCPF: '25512268139',
  sequence: 1,
  purchaseDate: new Date('2022-10-21'),
  ...props
})

type SutType = {
  sut: CountOrdersRepository
}

const makeSut = (): SutType => ({
  sut: new CountOrdersPrismaRepository(connection)
})

describe('CountOrdersPrismaRepository', () => {
  afterAll(async () => {
    await deleteAll(connection)
  })

  it('should return 0 if there are no orders', async () => {
    const { sut } = makeSut()

    const count = await sut.count()

    expect(count).toBe(0)
  })

  it('should return the amount of created orders', async () => {
    const { sut } = makeSut()
    const orders = [makeOrder({ sequence: 10 }), makeOrder({ sequence: 20 }), makeOrder({ sequence: 30 })]
    await connection.order.createMany({
      data: orders.map(order => ({
        cpf: order.getCPF(),
        code: order.getCode(),
        total: order.getTotalPrice()
      }))
    })

    const count = await sut.count()

    expect(count).toBe(3)
  })
})
