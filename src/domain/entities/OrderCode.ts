import { OrderCodeProperties } from './types'

export class OrderCode {
  private readonly code: string

  private readonly CONVERT_TO_8_DIGITS_NUMBER_FACTOR = 100_000_000
  private readonly ORDER_CODE_CORRECT_LENGTH = 8

  constructor ({
    currentDate = new Date()
  }: OrderCodeProperties) {
    this.code = this.generateCode(currentDate)
  }

  private generateCode (currentDate: Date): string {
    const currentYear = this.getCurrentYear(currentDate).toString()
    const hash = this.get8DigitHash().toString()

    return currentYear + hash
  }

  private getCurrentYear (currentDate: Date): number {
    return currentDate.getFullYear()
  }

  private get8DigitHash (): number {
    let hash: number

    do {
      hash = Math.ceil(this.generate8DigitsNumber())
    } while (this.hashIsNotWithCorrectLength(hash))

    return hash
  }

  private generate8DigitsNumber (): number {
    return Math.random() * this.CONVERT_TO_8_DIGITS_NUMBER_FACTOR
  }

  private hashIsNotWithCorrectLength (hash: number): boolean {
    const hashLength = hash.toString().length

    return hashLength !== this.ORDER_CODE_CORRECT_LENGTH
  }

  public getCode (): string {
    return this.code
  }
}
