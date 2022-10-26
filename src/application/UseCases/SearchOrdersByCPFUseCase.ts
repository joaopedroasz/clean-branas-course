import { SearchOrdersByCPF } from '../contracts'
import { SearchOrdersByCPFInput, SearchOrdersByCPFOutput } from '../DTOs'

export class SearchOrdersByCPFUseCase implements SearchOrdersByCPF {
  public async execute (input: SearchOrdersByCPFInput): Promise<SearchOrdersByCPFOutput> {
    return {
      code: '123',
      CPF: '737.978.953-80',
      orderItems: [],
      purchaseDate: new Date(),
      totalValue: 0
    }
  }
}
