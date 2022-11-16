import { City } from '@/domain/entities'

export interface GetCityByZipCodeRepository {
  getByZipCode: (zipCode: string) => Promise<City>
}
