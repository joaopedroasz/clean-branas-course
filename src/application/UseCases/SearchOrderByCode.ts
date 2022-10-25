import { Item, OrderItem } from '@/domain/entities'
import { GetOrderByCodeRepository } from '@/domain/repositories/Order'
import { GetItemsByOrderCodeRepository } from '@/domain/repositories/Item'
import { GetOrderItemsByOrderCodeRepository } from '@/domain/repositories/OrderItem'
import { SearchOrderByCode } from '../contracts'
import { SearchOrderByCodeInput, SearchOrderByCodeOutput, SearchOrderByCodeOutputItem, SearchOrderByCodeOutputOrderItem } from '../DTOs'
import { ItemNotFoundError } from '@/domain/errors'

export class SearchOrderByCodeUseCase implements SearchOrderByCode {
  private readonly getOrderByCodeRepository: GetOrderByCodeRepository
  private readonly getItemsByOrderCodeRepository: GetItemsByOrderCodeRepository
  private readonly getOrderItemsByOrderCodeRepository: GetOrderItemsByOrderCodeRepository

  constructor (
    getOrderByCodeRepository: GetOrderByCodeRepository,
    getItemsByOrderCodeRepository: GetItemsByOrderCodeRepository,
    getOrderItemsByOrderCodeRepository: GetOrderItemsByOrderCodeRepository
  ) {
    this.getOrderByCodeRepository = getOrderByCodeRepository
    this.getItemsByOrderCodeRepository = getItemsByOrderCodeRepository
    this.getOrderItemsByOrderCodeRepository = getOrderItemsByOrderCodeRepository
  }

  public async execute (input: SearchOrderByCodeInput): Promise<SearchOrderByCodeOutput> {
    const [order, items, orderItems] = await Promise.all([
      this.getOrderByCodeRepository.getByCode(input.code),
      this.getItemsByOrderCodeRepository.getByCode(input.code),
      this.getOrderItemsByOrderCodeRepository.getByOrderCode(input.code)
    ])

    return {
      code: order.getCode(),
      CPF: order.getCPF(),
      orderItems: orderItems.map(orderItem => this.getOrderItem(orderItem, items)),
      purchaseDate: order.getPurchaseDate(),
      total: order.getTotalPrice()
    }
  }

  private getOrderItem (orderItem: OrderItem, items: Item[]): SearchOrderByCodeOutputOrderItem {
    return {
      quantity: orderItem.getQuantity(),
      item: this.getItemByOrderCode(orderItem, items)
    }
  }

  private getItemByOrderCode (orderItem: OrderItem, items: Item[]): SearchOrderByCodeOutputItem {
    const item = items.find(item => item.getId() === orderItem.getItemId())
    if (!item) {
      throw new ItemNotFoundError({
        targetProperty: 'id',
        targetValue: orderItem.getItemId()
      })
    }
    return {
      id: item.getId(),
      description: item.getDescription(),
      height: item.getHeight(),
      price: item.getPrice(),
      width: item.getWidth(),
      depth: item.getDepth(),
      weight: item.getWeight()
    }
  }
}
