export class CPF {
  public readonly value: string
  private readonly MINIMUM_CPF_LENGTH = 11
  private readonly MAXIMUM_CPF_LENGTH = 14

  constructor (value: string) {
    if (!this.isValid(value)) throw new Error('Invalid CPF')
    this.value = value
  }

  private isValid (rawCpf: string): boolean {
    if (!rawCpf || !this.isWithCorrectLength(rawCpf)) return false
    const cpf = this.removeSpecialCharacters(rawCpf)
    if (this.isWithAllNumbersEquals(cpf)) return false

    const firstVerifierDigit = this.calculateVerifierDigit(cpf, 11)
    const secundVerifierDigit = this.calculateVerifierDigit(cpf, 12)

    const getVerifierDigitsFromGivenCpf = this.getVerifierDigits(cpf)
    const calculatedVerifierDigits = `${firstVerifierDigit}${secundVerifierDigit}`

    return getVerifierDigitsFromGivenCpf === calculatedVerifierDigits
  }

  private isWithCorrectLength (cpf: string): boolean {
    return cpf.length >= this.MINIMUM_CPF_LENGTH || cpf.length <= this.MAXIMUM_CPF_LENGTH
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

  private calculateVerifierDigit (cpf: string, cpfRange: number): number {
    let calculateDigit = 0
    for (let i = 1; i < cpfRange - 1; i++) {
      const currentCpfCharacter = Number(cpf.substring(i - 1, i))

      calculateDigit += (cpfRange - i) * currentCpfCharacter
    }

    const restFromCalculateDigit = calculateDigit % 11

    return (restFromCalculateDigit < 2) ? 0 : 11 - restFromCalculateDigit
  }

  private getVerifierDigits (cpf: string): string {
    return cpf.substring(cpf.length - 2, cpf.length)
  }
}
