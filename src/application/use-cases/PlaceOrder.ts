import { Order } from '@/domain/entities'
import { ItemRepository, OrderRepository } from '@/domain/repositories'
import { PlaceOrderUseCase } from '../contracts/use-cases'
import { PlaceOrderInput, PlaceOrderOutput } from '../dtos/place-order'

export class PlaceOrder implements PlaceOrderUseCase {
  private readonly itemRepository: ItemRepository
  private readonly orderRepository: OrderRepository

  constructor (itemRepository: ItemRepository, orderRepository: OrderRepository) {
    this.itemRepository = itemRepository
    this.orderRepository = orderRepository
  }

  public async execute (input: PlaceOrderInput): Promise<PlaceOrderOutput> {
    const order = new Order({ cpf: input.CPF })
    for (const orderItem of input.orderItems) {
      const item = await this.itemRepository.getById(orderItem.idItem)
      order.addItem(item, orderItem.quantity)
    }

    const orderCode = order.orderCode

    const { orderCode: code } = await this.orderRepository.save({ order, orderCode })

    return {
      total: order.getTotalPrice(),
      orderCode: code
    }
  }
}
