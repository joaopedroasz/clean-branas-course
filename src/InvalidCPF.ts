import { InvalidPropertyError } from './InvalidProperty'

export class InvalidCpfError extends InvalidPropertyError {
  constructor (CPF: string) {
    super({
      propertyName: 'CPF',
      value: CPF
    })
    this.name = 'InvalidCpfError'
  }
}
