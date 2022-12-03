export type InvalidPropertyErrorProps = {
  propertyName: string
  propertyValue: string | number | Date
}

export class InvalidPropertyError extends Error {
  constructor ({
    propertyName,
    propertyValue
  }: InvalidPropertyErrorProps) {
    super(`Invalid property: ${propertyName}. Received: ${propertyValue}`)
    this.name = 'InvalidPropertyError'
  }
}
