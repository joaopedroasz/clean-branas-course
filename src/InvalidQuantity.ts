import { InvalidPropertyError } from './InvalidProperty'

export class InvalidQuantityError extends InvalidPropertyError {
  constructor (quantity: number) {
    super({
      propertyName: 'quantity',
      value: quantity
    })
    this.name = 'InvalidQuantityError'
  }
}
