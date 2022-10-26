import { GetOrdersByCPFRepository } from '@/domain/repositories/Order'
import { SearchOrdersByCPF } from '../contracts'
import { SearchOrdersByCPFInputDTO, SearchOrdersByCPFOutputDTO } from '../DTOs'

export class SearchOrdersByCPFUseCase implements SearchOrdersByCPF {
  private readonly getOrdersByCPFRepository: GetOrdersByCPFRepository

  constructor (getOrdersByCPFRepository: GetOrdersByCPFRepository) {
    this.getOrdersByCPFRepository = getOrdersByCPFRepository
  }

  public async execute (input: SearchOrdersByCPFInputDTO): Promise<SearchOrdersByCPFOutputDTO> {
    const orders = await this.getOrdersByCPFRepository.getByCPF(input.CPF)
    return {
      orders: orders.map(order => ({
        code: order.getCode(),
        CPF: order.getCPF(),
        purchaseDate: order.getPurchaseDate(),
        totalValue: order.getTotalPrice(),
        orderItems: []
      }))
    }
  }
}
