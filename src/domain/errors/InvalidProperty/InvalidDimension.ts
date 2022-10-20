import { InvalidPropertyError, InvalidPropertyProps } from './InvalidProperty'

export class InvalidDimensionError extends InvalidPropertyError {
  constructor (props: InvalidPropertyProps) {
    super(props)
    this.name = 'InvalidDimensionError'
  }
}
