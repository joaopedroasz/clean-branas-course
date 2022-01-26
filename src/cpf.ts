export class CPF {
  public value: string
  private readonly CPF_VALID_LENGTH = 11

  constructor (value: string) {
    if (!this.isValid(value)) throw new Error('Invalid CPF')
    this.value = value
  }

  private isValid (rawCpf: string): boolean {
    if (!rawCpf) return false
    const cpf = this.removeSpecialCharacters(rawCpf)
    if (!this.isWithCorrectLength(cpf) || this.isWithAllNumbersEquals(cpf)) return false

    const firstVerifierDigit = this.calculateVerifierDigit(cpf, 10)
    const secundVerifierDigit = this.calculateVerifierDigit(cpf, 11)

    const getVerifierDigitsFromGivenCpf = this.getVerifierDigits(cpf)
    const calculatedVerifierDigits = `${firstVerifierDigit}${secundVerifierDigit}`

    return getVerifierDigitsFromGivenCpf === calculatedVerifierDigits
  }

  private isWithCorrectLength (cpf: string): boolean {
    return cpf.length === this.CPF_VALID_LENGTH
  }

  private removeSpecialCharacters (cpf: string): string {
    return cpf.split('')
      .filter(
        cpfCharacter => cpfCharacter !== '.' && cpfCharacter !== '-' && cpfCharacter !== ' ')
      .join('')
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
}
