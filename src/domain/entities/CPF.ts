import { InvalidCpfError } from '@/domain/errors'

export class CPF {
  private readonly VALID_LENGTH = 11
  private readonly FIRST_VERIFICATION_DIGIT_INDEX = 9
  private readonly SECOND_VERIFICATION_DIGIT_INDEX = 11
  private readonly FIRST_VERIFICATION_DIGIT_FACTOR = 10
  private readonly SECOND_VERIFICATION_DIGIT_FACTOR = 11
  private readonly MIN_FACTOR = 2

  private readonly rawCPF: string

  constructor (rawCPF: string) {
    this.rawCPF = rawCPF
    const isValid = this.validate()
    if (!isValid) throw new InvalidCpfError(rawCPF)
  }

  private validate (): boolean {
    if (!this.rawCPF) return false
    const cpf = this.removeNonDigits(this.rawCPF)
    if (!this.hasValidLength(cpf) || this.allDigitsAreEqual(cpf)) return false

    const verificationDigits = this.getVerificationDigits(cpf)
    const firstVerificationDigit = this.calculateVerificationDigit(cpf, this.FIRST_VERIFICATION_DIGIT_FACTOR)
    const secondVerificationDigit = this.calculateVerificationDigit(cpf, this.SECOND_VERIFICATION_DIGIT_FACTOR)
    const calculatedVerificationDigits = `${firstVerificationDigit}${secondVerificationDigit}`

    return verificationDigits === calculatedVerificationDigits
  }

  private hasValidLength (rawCPF: string): boolean {
    return rawCPF.length === this.VALID_LENGTH
  }

  private removeNonDigits (rawCPF: string): string {
    return rawCPF.replace(/\D/g, '')
  }

  private allDigitsAreEqual (cpf: string): boolean {
    return cpf.split('').every(character => character === cpf[0])
  }

  private calculateVerificationDigit (cpf: string, factor: number): number {
    let sum = 0

    for (const character of cpf) {
      const digit = Number(character)
      sum += digit * factor--
      if (factor < this.MIN_FACTOR) break
    }

    const rest = sum % 11
    return rest < 2 ? 0 : 11 - rest
  }

  private getVerificationDigits (cpf: string): string {
    return cpf.substring(this.FIRST_VERIFICATION_DIGIT_INDEX, this.SECOND_VERIFICATION_DIGIT_INDEX)
  }

  public getCPF (): string {
    return this.rawCPF
  }
}
