import { GetOrderByCodeRepository } from '@/domain/repositories/Order'
import { SearchOrderByCode } from '../contracts'
import { SearchOrderByCodeInput, SearchOrderByCodeOutput } from '../DTOs'

export class SearchOrderByCodeUseCase implements SearchOrderByCode {
  private readonly getOrderByCodeRepository: GetOrderByCodeRepository

  constructor (getOrderByCodeRepository: GetOrderByCodeRepository) {
    this.getOrderByCodeRepository = getOrderByCodeRepository
  }

  public async execute (input: SearchOrderByCodeInput): Promise<SearchOrderByCodeOutput> {
    const order = await this.getOrderByCodeRepository.getByCode(input.code)

    return {
      code: order.getCode(),
      CPF: order.getCPF(),
      items: [],
      purchaseDate: order.getPurchaseDate(),
      total: order.getTotalPrice()
    }
  }
}
