import { OrderRepository } from '@/domain/repositories'

import { SearchOrderByCodeUseCase } from '../contracts'
import { SearchOrderByCodeInput, SearchOrderByCodeOutput } from '../dtos'

export class SearchOrderByCode implements SearchOrderByCodeUseCase {
  private readonly orderRepository: OrderRepository

  constructor (orderRepository: OrderRepository) {
    this.orderRepository = orderRepository
  }

  public async execute (input: SearchOrderByCodeInput): Promise<SearchOrderByCodeOutput> {
    await this.orderRepository.getByCode(input.orderCode)

    return {
      buyerCPF: '',
      freightValue: 0,
      issueDate: new Date(),
      items: [],
      orderCode: input.orderCode,
      orderId: '',
      couponId: '',
      price: 0
    }
  }
}
