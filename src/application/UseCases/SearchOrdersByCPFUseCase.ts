import { Item, Order, OrderItem } from '@/domain/entities'
import { ItemNotFoundError } from '@/domain/errors'
import { GetItemsByOrderCPFRepository } from '@/domain/repositories/Item'
import { GetOrdersByCPFRepository } from '@/domain/repositories/Order'
import { SearchOrdersByCPF } from '../contracts'
import { SearchOrdersByCPFInputDTO, SearchOrdersByCPFOutputDTO, SearchOrdersByCPFOutputItem, SearchOrdersByCPFOutputOrder } from '../DTOs'

export class SearchOrdersByCPFUseCase implements SearchOrdersByCPF {
  private readonly getOrdersByCPFRepository: GetOrdersByCPFRepository
  private readonly getItemsByOrderCPFRepository: GetItemsByOrderCPFRepository

  constructor (
    getOrdersByCPFRepository: GetOrdersByCPFRepository,
    getItemsByOrderCPFRepository: GetItemsByOrderCPFRepository
  ) {
    this.getOrdersByCPFRepository = getOrdersByCPFRepository
    this.getItemsByOrderCPFRepository = getItemsByOrderCPFRepository
  }

  public async execute (input: SearchOrdersByCPFInputDTO): Promise<SearchOrdersByCPFOutputDTO> {
    const { CPF } = input
    const [orders, items] = await Promise.all([
      this.getOrdersByCPFRepository.getByCPF(CPF),
      this.getItemsByOrderCPFRepository.getByOrderCPF(CPF)
    ])
    return {
      orders: this.formatOrders(orders, items)
    }
  }

  private formatOrders (orders: Order[], items: Item[]): SearchOrdersByCPFOutputOrder[] {
    return orders.map(order => ({
      code: order.getCode(),
      CPF: order.getCPF(),
      purchaseDate: order.getPurchaseDate(),
      totalValue: order.getTotalPrice(),
      orderItems: order.getOrderItems().map(orderItem => ({
        quantity: orderItem.getQuantity(),
        item: this.getItemByOrderItem(orderItem, items)
      }))
    }))
  }

  private getItemByOrderItem (orderItem: OrderItem, items: Item[]): SearchOrdersByCPFOutputItem {
    const item = items.find(item => item.getId() === orderItem.getItemId())

    if (!item) {
      throw new ItemNotFoundError({
        targetProperty: 'id',
        targetValue: orderItem.getItemId()
      })
    }

    return this.formatItem(item)
  }

  private formatItem (item: Item): SearchOrdersByCPFOutputItem {
    return {
      id: item.getId(),
      description: item.getDescription(),
      price: item.getPrice(),
      weight: item.getWeight(),
      height: item.getHeight(),
      width: item.getWidth(),
      depth: item.getDepth()
    }
  }
}
