import { CPF } from '@/cpf'
import { InvalidCPFerror } from '@/errors'

const makeSut = (cpf: string): CPF => {
  return new CPF(cpf)
}

describe('CPF entity', () => {
  test('should be created when CPF is valid', () => {
    const isValidCPF = makeSut('237.967.084-63')

    expect(isValidCPF).toBeDefined()
  })

  test('should throw an Error when CPF is invalid', () => {
    const invalidCPF = '289.246.570-00'

    expect(() => makeSut(invalidCPF)).toThrowError(new InvalidCPFerror(invalidCPF))
  })

  test('should throw an Error when CPF has all equal numbers', () => {
    const CPFwithAllEqualNumbers = '111.111.111-11'

    expect(() => makeSut(CPFwithAllEqualNumbers)).toThrowError(new InvalidCPFerror(CPFwithAllEqualNumbers))
  })

  test('should throw an Error when CPF is smaller than allowed', () => {
    const smallCPF = '111.111.1'

    expect(() => makeSut(smallCPF)).toThrowError(new InvalidCPFerror(smallCPF))
  })

  test('should throw an Error when CPF is bigger than allowed', () => {
    const bigCPF = '343.454.775-89543'

    expect(() => makeSut(bigCPF)).toThrowError(new InvalidCPFerror(bigCPF))
  })

  test('should throw an Error when CPF is empty', () => {
    expect(() => makeSut('')).toThrowError(new InvalidCPFerror(''))
  })
})
