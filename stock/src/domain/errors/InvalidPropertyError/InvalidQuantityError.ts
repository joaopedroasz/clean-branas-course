import { InvalidPropertyError } from './InvalidPropertyError'

export class InvalidQuantityError extends InvalidPropertyError {
  constructor (quantity: number) {
    super({
      propertyName: 'quantity',
      propertyValue: quantity
    })
    this.name = 'InvalidQuantityError'
  }
}
