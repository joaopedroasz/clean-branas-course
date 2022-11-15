import { SearchOrderByCodeInput, SearchOrderByCodeOutput } from '@/application/DTOs'
import { UseCase } from './UseCase'

export interface SearchOrderByCode extends UseCase<SearchOrderByCodeInput, SearchOrderByCodeOutput> {}
