export class InvalidPercentageError extends Error {
  constructor (percentage: number) {
    super(`Invalid percentage ${percentage}`)
    this.name = 'InvalidPercentageError'
  }
}
