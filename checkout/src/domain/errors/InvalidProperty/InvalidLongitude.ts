import { InvalidPropertyError } from './InvalidProperty'

export class InvalidLongitudeError extends InvalidPropertyError {
  constructor (longitude: number) {
    super({
      propertyName: 'longitude',
      value: longitude
    })
    this.name = 'InvalidLongitudeError'
  }
}
