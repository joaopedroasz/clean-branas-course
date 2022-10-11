export type InvalidPropertyProps = {
  propertyName: string
  value: any
}

export class InvalidPropertyError extends Error {
  constructor (props: InvalidPropertyProps) {
    super(`Invalid property: ${props.propertyName} with value: ${props.value}`)
    this.name = 'InvalidPropertyError'
  }
}
