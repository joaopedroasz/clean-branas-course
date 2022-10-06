export class InvalidPriceError extends Error {
  constructor (price: number) {
    super(`Invalid price: ${price}`)
    this.name = 'InvalidPriceError'
  }
}
