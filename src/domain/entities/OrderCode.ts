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
    let hash: number

    do {
      hash = Math.ceil(this.generate8DigitsNumber())
    } while (!this.isHashWithCorrectLength(hash))

    return hash
  }

  private generate8DigitsNumber (): number {
    return Math.random() * this.CONVERT_TO_8_DIGITS_NUMBER_FACTOR
  }

  private isHashWithCorrectLength (hash: number): boolean {
    const hashLength = hash.toString().length

    return hashLength === 8
  }
}
