import { CPF } from '@/cpf'

const makeSut = (cpf: string): CPF => {
  return new CPF(cpf)
}

describe('CPF component', () => {
  test('should return true when CPF is valid', () => {
    const isValidCPF = makeSut('289.246.570-20').isValid()

    expect(isValidCPF).toBeTruthy()
  })

  test('should return true when CPF is invalid', () => {
    const isValidCPF = makeSut('289.246.570-00').isValid()

    expect(isValidCPF).toBeFalsy()
  })

  test('should return false when CPF is with all numbers equals', () => {
    const isValidCPF = makeSut('111.111.111-11').isValid()

    expect(isValidCPF).toBeFalsy()
  })

  test('should return false when CPF smaller than allowed', () => {
    const isValidCPF = makeSut('111.111.1').isValid()

    expect(isValidCPF).toBeFalsy()
  })

  test('should return false when CPF bigger than allowed', () => {
    const isValidCPF = makeSut('111.111.111-11111').isValid()

    expect(isValidCPF).toBeFalsy()
  })

  test('should return false when CPF is empty', () => {
    const isValidCPF = makeSut('').isValid()

    expect(isValidCPF).toBeFalsy()
  })
})
