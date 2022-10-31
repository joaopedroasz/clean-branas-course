import { Coordinates } from '@/domain/entities'

export interface GetCoordinateByCEPGateway {
  getByCEP: (CEP: string) => Promise<Coordinates>
}
