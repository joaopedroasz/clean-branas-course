import { InvalidPropertyError } from './InvalidProperty'

export class InvalidPercentageError extends InvalidPropertyError {
  constructor (percentage: number) {
    super({
      propertyName: 'percentage',
      value: percentage
    })
    this.name = 'InvalidPercentageError'
  }
}
