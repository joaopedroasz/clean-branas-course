import { InvalidCPFerror } from '../errors'

export class CPF {
  private readonly value: string
  private readonly CPF_VALID_LENGTH = 11
  private readonly FACTOR_FIRST_VERIFIER_DIGIT = 10
  private readonly FACTOR_SECOND_VERIFIER_DIGIT = 11

  constructor (value: string) {
    this.validateCPF(value)
    this.value = value
  }

  private validateCPF (value: string): void {
    if (!this.isValid(value)) throw new InvalidCPFerror(value)
  }

  private isValid (rawCpf: string): boolean {
    if (!rawCpf) return false
    const cpf = this.removeSpecialCharacters(rawCpf)
    if (!this.isWithCorrectLength(cpf) || this.isWithAllNumbersEquals(cpf)) return false

    const firstVerifierDigit = this.calculateVerifierDigit(cpf, this.FACTOR_FIRST_VERIFIER_DIGIT)
    const secundVerifierDigit = this.calculateVerifierDigit(cpf, this.FACTOR_SECOND_VERIFIER_DIGIT)

    const getVerifierDigitsFromGivenCpf = this.getVerifierDigits(cpf)
    const calculatedVerifierDigits = `${firstVerifierDigit}${secundVerifierDigit}`

    return getVerifierDigitsFromGivenCpf === calculatedVerifierDigits
  }

  private removeSpecialCharacters (cpf: string): string {
    return cpf.split('')
      .filter(
        cpfCharacter => cpfCharacter !== '.' && cpfCharacter !== '-' && cpfCharacter !== ' ')
      .join('')
  }

  private isWithCorrectLength (cpf: string): boolean {
    return cpf.length === this.CPF_VALID_LENGTH
  }

  private isWithAllNumbersEquals (cpf: string): boolean {
    return cpf.split('').every(cpfCharacter => cpfCharacter === cpf[0])
  }

  private calculateVerifierDigit (cpf: string, factor: number): number {
    let calculateDigit = 0
    for (const digit of cpf) {
      if (factor > 1) calculateDigit += Number(digit) * factor--
    }

    const restFromCalculateDigit = calculateDigit % 11

    return (restFromCalculateDigit < 2) ? 0 : 11 - restFromCalculateDigit
  }

  private getVerifierDigits (cpf: string): string {
    return cpf.substring(cpf.length - 2, cpf.length)
  }

  public getValue (): string {
    return this.value
  }
}
