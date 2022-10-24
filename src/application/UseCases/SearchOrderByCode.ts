import { SearchOrderByCode } from '../contracts'
import { SearchOrderByCodeInput, SearchOrderByCodeOutput } from '../DTOs'

export class SearchOrderByCodeUseCase implements SearchOrderByCode {
  public async execute (input: SearchOrderByCodeInput): Promise<SearchOrderByCodeOutput> {
    return {
      code: '202200000001',
      CPF: '483.967.454-04',
      items: [],
      purchaseDate: new Date('2022-10-24T15:30:00'),
      total: 0
    }
  }
}
