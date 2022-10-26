import { SearchOrdersByCPFInput, SearchOrdersByCPFOutput } from '@/application/DTOs'
import { UseCase } from './UseCase'

export interface SearchOrdersByCPF extends UseCase<SearchOrdersByCPFInput, SearchOrdersByCPFOutput> {}
