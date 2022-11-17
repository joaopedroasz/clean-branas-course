import { CalculateFreightUseCase } from '@/application/UseCases'
import { GetCityByZipCodeGatewayBrasilApiAdapter, HttpClientAxiosAdapter } from '@/infra/gateways'
import { CalculateFreightHttpController } from '../../controllers'
import { ServerHttpRest } from '../contracts'

export class CalculateFreightRoute {
  constructor (httpRest: ServerHttpRest) {
    const httpClient = new HttpClientAxiosAdapter()
    const getCityByZipCodeGateway = new GetCityByZipCodeGatewayBrasilApiAdapter('https://brasilapi.com.br/api/cep/v2/', httpClient)
    const calculateFreightUseCase = new CalculateFreightUseCase(getCityByZipCodeGateway)
    const controller = new CalculateFreightHttpController(calculateFreightUseCase)
    httpRest.on('post', '/calculate-freight', controller)
  }
}
