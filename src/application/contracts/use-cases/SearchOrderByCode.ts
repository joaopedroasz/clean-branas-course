import { SearchOrderByCodeInput, SearchOrderByCodeOutput } from '@/application/dtos'

import { UseCase } from './UseCase'

export interface SearchOrderByCodeUseCase extends UseCase<SearchOrderByCodeInput, SearchOrderByCodeOutput> {}
