import { City } from '@/domain/entities'

export interface GetCityByZipCodeGateway {
  getByZipCode: (zipCode: string) => Promise<City>
}
