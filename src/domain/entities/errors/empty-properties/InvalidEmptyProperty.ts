export class InvalidEmptyProperty extends Error {
  constructor (propertyName: string) {
    super(`Invalid empty ${propertyName} property`)
  }
}
