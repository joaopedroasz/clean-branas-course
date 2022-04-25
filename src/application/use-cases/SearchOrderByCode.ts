import { SearchOrderByCodeUseCase } from '../contracts'
import { SearchOrderByCodeInput, SearchOrderByCodeOutput } from '../dtos'

export class SearchOrderByCode implements SearchOrderByCodeUseCase {
  public async execute (input: SearchOrderByCodeInput): Promise<SearchOrderByCodeOutput> {
    return {
      buyerCPF: '',
      freightValue: 0,
      issueDate: new Date(),
      items: [],
      orderCode: '',
      orderId: '',
      couponId: '',
      price: 0
    }
  }
}
