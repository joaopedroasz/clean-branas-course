import { InvalidPropertyError } from './InvalidProperty'

export class InvalidPriceError extends InvalidPropertyError {
  constructor (price: number) {
    super({
      propertyName: 'price',
      value: price
    })
    this.name = 'InvalidPriceError'
  }
}
