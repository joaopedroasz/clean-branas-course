const MINIMUM_CPF_LENGTH = 11
const MAXIMUM_CPF_LENGTH = 11

export function validate (rawCpf: string): boolean {
  if (!rawCpf || !isCpfWithCorrectLength(rawCpf)) return false
  const cpf = removeSpecialCharacters(rawCpf)
  if (isCpfWithAllNumbersEquals(cpf)) return false

  const firstVerifierDigit = calculateVerifierDigit(cpf, 11)
  const secundVerifierDigit = calculateVerifierDigit(cpf, 12)

  const getVerifierDigitsFromGivenCpf = cpf.substring(cpf.length - 2, cpf.length)
  const calculatedVerifierDigits = `${firstVerifierDigit}${secundVerifierDigit}`

  return getVerifierDigitsFromGivenCpf === calculatedVerifierDigits
}

function isCpfWithCorrectLength (cpf: string): boolean {
  return cpf.length >= MINIMUM_CPF_LENGTH || cpf.length <= MAXIMUM_CPF_LENGTH
}

function removeSpecialCharacters (cpf: string): string {
  return cpf.split('')
    .filter(
      cpfCharacter => cpfCharacter !== '.' && cpfCharacter !== '-' && cpfCharacter !== ' ')
    .join('')
}

function isCpfWithAllNumbersEquals (cpf: string): boolean {
  return cpf.split('').every(cpfCharacter => cpfCharacter === cpf[0])
}

function calculateVerifierDigit (cpf: string, cpfRange: number): number {
  let calculateDigit = 0
  for (let i = 1; i < cpfRange - 1; i++) {
    const currentCpfCharacter = Number(cpf.substring(i - 1, i))

    calculateDigit += (cpfRange - i) * currentCpfCharacter
  }

  const restFromCalculateDigit = calculateDigit % 11

  return (restFromCalculateDigit < 2) ? 0 : 11 - restFromCalculateDigit
}
