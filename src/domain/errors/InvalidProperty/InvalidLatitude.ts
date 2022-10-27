import { InvalidPropertyError } from './InvalidProperty'

export class InvalidLatitudeError extends InvalidPropertyError {
  constructor (latitude: number) {
    super({
      propertyName: 'latitude',
      value: latitude
    })
    this.name = 'InvalidLatitudeError'
  }
}
