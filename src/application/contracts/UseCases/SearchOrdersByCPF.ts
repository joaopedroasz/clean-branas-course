import { SearchOrdersByCPFInputDTO, SearchOrdersByCPFOutputDTO } from '@/application/DTOs'
import { UseCase } from './UseCase'

export interface SearchOrdersByCPF extends UseCase<SearchOrdersByCPFInputDTO, SearchOrdersByCPFOutputDTO> {}
