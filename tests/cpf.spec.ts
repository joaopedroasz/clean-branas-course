import { CPF } from '@/cpf'

const makeSut = (cpf: string): CPF => {
  return new CPF(cpf)
}

describe('CPF component', () => {
  test('should be created when CPF is valid', () => {
    const isValidCPF = makeSut('237.967.084-63')

    expect(isValidCPF).toBeDefined()
  })

  test('should throw an Error when CPF is invalid', () => {
    expect(() => makeSut('289.246.570-00')).toThrowError('Invalid CPF')
  })

  test('should throw an Error when CPF has all equal numbers', () => {
    expect(() => makeSut('111.111.111-11')).toThrowError('Invalid CPF')
  })

  test('should throw an Error when CPF is smaller than allowed', () => {
    expect(() => makeSut('111.111.1')).toThrowError('Invalid CPF')
  })

  test('should throw an Error when CPF is bigger than allowed', () => {
    expect(() => makeSut('343.454.775-89543')).toThrowError('Invalid CPF')
  })

  test('should throw an Error when CPF is empty', () => {
    expect(() => makeSut('')).toThrowError('Invalid CPF')
  })
})
