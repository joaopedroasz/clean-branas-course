export class InvalidEmptyPropertyError extends Error {
  constructor (propertyName: string) {
    super(`Invalid empty ${propertyName} property`)
  }
}
