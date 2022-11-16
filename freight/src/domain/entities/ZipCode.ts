export type ZipCodeProps = {
  code: string
  idCity: string
  street: string
  neighborhood: string
}

export class ZipCode {
  readonly code: string
  readonly idCity: string
  readonly street: string
  readonly neighborhood: string

  constructor ({
    code,
    idCity,
    street,
    neighborhood
  }: ZipCodeProps) {
    this.code = code
    this.idCity = idCity
    this.street = street
    this.neighborhood = neighborhood
  }
}
