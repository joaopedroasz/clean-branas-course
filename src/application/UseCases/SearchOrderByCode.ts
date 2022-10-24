import { GetOrderByCodeRepository } from '@/domain/repositories/Order'
import { GetItemsByOrderCodeRepository } from '@/domain/repositories/Item'
import { SearchOrderByCode } from '../contracts'
import { SearchOrderByCodeInput, SearchOrderByCodeOutput } from '../DTOs'

export class SearchOrderByCodeUseCase implements SearchOrderByCode {
  private readonly getOrderByCodeRepository: GetOrderByCodeRepository
  private readonly getItemsByOrderCodeRepository: GetItemsByOrderCodeRepository

  constructor (
    getOrderByCodeRepository: GetOrderByCodeRepository,
    getItemsByOrderCodeRepository: GetItemsByOrderCodeRepository
  ) {
    this.getOrderByCodeRepository = getOrderByCodeRepository
    this.getItemsByOrderCodeRepository = getItemsByOrderCodeRepository
  }

  public async execute (input: SearchOrderByCodeInput): Promise<SearchOrderByCodeOutput> {
    const order = await this.getOrderByCodeRepository.getByCode(input.code)
    await this.getItemsByOrderCodeRepository.getByCode(input.code)

    return {
      code: order.getCode(),
      CPF: order.getCPF(),
      items: [],
      purchaseDate: order.getPurchaseDate(),
      total: order.getTotalPrice()
    }
  }
}
