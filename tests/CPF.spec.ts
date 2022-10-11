import { CPF } from '@/CPF'
import { InvalidCpfError } from '@/InvalidCPF'

const makeSut = (cpf: string): CPF => new CPF(cpf)

describe('CPF', () => {
  let sut: CPF
  const validCPF = '607.109.010-54'

  beforeEach(() => {
    sut = makeSut(validCPF)
  })

  it('should create a valid CPF instance if provided CPF is valid', () => {
    expect(sut).toBeTruthy()
  })

  it('should return CPF if created instance if valid', () => {
    expect(sut.getCPF()).toBe(validCPF)
  })

  it('should create CPF if valid CPF that ends with 0 is provided', () => {
    const validCPF = '47308766870'
    const sut = makeSut(validCPF)

    expect(sut).toBeTruthy()
  })

  it('should throw a InvalidCpfError if invalid CPF provided', () => {
    const invalidCPF = '705.738.222-72'
    const sut = (): CPF => makeSut(invalidCPF)

    expect(sut).toThrowError(new InvalidCpfError(invalidCPF))
  })

  it('should throw a InvalidCpfError if no CPF is provided', () => {
    const invalidCPF = ''
    const sut = (): CPF => makeSut(invalidCPF)

    expect(sut).toThrowError(new InvalidCpfError(invalidCPF))
  })

  it('should throw a InvalidCpfError if CPF has less than 11 digits', () => {
    const invalidCPF = '607.109.010-5'
    const sut = (): CPF => makeSut(invalidCPF)

    expect(sut).toThrowError(new InvalidCpfError(invalidCPF))
  })

  it('should throw a InvalidCpfError if CPF has more than 14 digits', () => {
    const invalidCPF = '607.109.010-555'
    const sut = (): CPF => makeSut(invalidCPF)

    expect(sut).toThrowError(new InvalidCpfError(invalidCPF))
  })

  it('should throw a InvalidCpfError if all digits are equal', () => {
    const invalidCPF = '111.111.111-11'
    const sut = (): CPF => makeSut(invalidCPF)

    expect(sut).toThrowError(new InvalidCpfError(invalidCPF))
  })
})
