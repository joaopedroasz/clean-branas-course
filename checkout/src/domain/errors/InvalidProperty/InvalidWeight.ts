import { InvalidPropertyError } from './InvalidProperty'

export class InvalidWeightError extends InvalidPropertyError {
  constructor (weight: number) {
    super({
      propertyName: 'weight',
      value: weight
    })
  }
}
