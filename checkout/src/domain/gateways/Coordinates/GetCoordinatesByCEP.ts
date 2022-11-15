import { Coordinates } from '@/domain/entities'

export interface GetCoordinatesByCEPGateway {
  getByCEP: (CEP: string) => Promise<Coordinates>
}
