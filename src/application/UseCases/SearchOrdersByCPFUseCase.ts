import { GetOrdersByCPFRepository } from '@/domain/repositories/Order'
import { GetOrderItemsByOrderCPFRepository } from '@/domain/repositories/OrderItem'
import { SearchOrdersByCPF } from '../contracts'
import { SearchOrdersByCPFInputDTO, SearchOrdersByCPFOutputDTO } from '../DTOs'

export class SearchOrdersByCPFUseCase implements SearchOrdersByCPF {
  private readonly getOrdersByCPFRepository: GetOrdersByCPFRepository
  private readonly getOrderItemsByOrderCPFRepository: GetOrderItemsByOrderCPFRepository

  constructor (
    getOrdersByCPFRepository: GetOrdersByCPFRepository,
    getOrderItemsByOrderCPFRepository: GetOrderItemsByOrderCPFRepository
  ) {
    this.getOrdersByCPFRepository = getOrdersByCPFRepository
    this.getOrderItemsByOrderCPFRepository = getOrderItemsByOrderCPFRepository
  }

  public async execute (input: SearchOrdersByCPFInputDTO): Promise<SearchOrdersByCPFOutputDTO> {
    const { CPF } = input
    const orders = await this.getOrdersByCPFRepository.getByCPF(CPF)
    await this.getOrderItemsByOrderCPFRepository.getByOrderCPF(CPF)
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
