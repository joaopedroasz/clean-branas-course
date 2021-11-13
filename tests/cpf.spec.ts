import { validate } from '@/cpf'

describe('Validate CPF function', () => {
  test('should return true when CPF is valid', () => {
    const isValidCPF = validate('289.246.570-20')

    expect(isValidCPF).toBeTruthy()
  })

  test('should return true when CPF is invalid', () => {
    const isValidCPF = validate('289.246.570-00')

    expect(isValidCPF).toBeFalsy()
  })

  test('should return false when CPF is with all numbers equals', () => {
    const isValidCPF = validate('111.111.111-11')

    expect(isValidCPF).toBeFalsy()
  })

  test('should return false when CPF smaller than allowed', () => {
    const isValidCPF = validate('111.111.1')

    expect(isValidCPF).toBeFalsy()
  })

  test('should return false when CPF bigger than allowed', () => {
    const isValidCPF = validate('111.111.111-11111')

    expect(isValidCPF).toBeFalsy()
  })

  test('should return false when CPF is empty', () => {
    const isValidCPF = validate('')

    expect(isValidCPF).toBeFalsy()
  })
})
