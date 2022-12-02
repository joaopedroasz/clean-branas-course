import { SimulateFreightUseCase } from '@/application/UseCases'
import { GetItemByIdPrismaRepository, PrismaClientSingleton } from '@/infra/database'
import { CalculateFreightExternalAPIAdapter, HttpClientAxiosAdapter } from '@/infra/gateways'
import { SimulateFreightHttpController } from '../../controllers'
import { adaptResolver } from '../adapters'
import { QueryResolvers } from '../generated/generated-resolvers'

export const simulateFreightQueryResolver: QueryResolvers = {
  simulateFreight: async (_, args) => {
    const httpClient = new HttpClientAxiosAdapter()
    const getCoordinatesByCEPHttpClient = new CalculateFreightExternalAPIAdapter('http://localhost:4001/calculate-freight', httpClient)

    const prismaClient = PrismaClientSingleton.getInstance()
    const getItemByIdPrismRepository = new GetItemByIdPrismaRepository(prismaClient)

    const simulateFreight = new SimulateFreightUseCase(getItemByIdPrismRepository, getCoordinatesByCEPHttpClient)
    const simulateFreightController = new SimulateFreightHttpController(simulateFreight)

    return adaptResolver(simulateFreightController, args)
  }
}
