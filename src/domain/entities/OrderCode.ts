export class OrderCode {
  private code: string

  private readonly CONVERT_TO_8_DIGITS_NUMBER_FACTOR = 100_000_000

  constructor () {
    this.code = ''
  }

  public getCode (): string {
    return this.code
  }

  public generate (): void {
    const currentYear = this.getCurrentYear().toString()
    const hash = this.get8DigitHash().toString()

    this.code = currentYear + hash
  }

  private getCurrentYear (currentDate = new Date()): number {
    return currentDate.getFullYear()
  }

  private get8DigitHash (): number {
    return Math.floor(this.generate8DigitsNumber())
  }

  private generate8DigitsNumber (): number {
    return Math.random() * this.CONVERT_TO_8_DIGITS_NUMBER_FACTOR
  }
}
