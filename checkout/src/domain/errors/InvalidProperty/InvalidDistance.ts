import { InvalidPropertyError } from './InvalidProperty'

export class InvalidDistanceError extends InvalidPropertyError {
  constructor (distance: number) {
    super({
      propertyName: 'distance',
      value: distance
    })
    this.name = 'InvalidDistanceError'
  }
}
