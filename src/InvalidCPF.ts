export class InvalidCpfError extends Error {
  constructor (CPF: string) {
    super(`Invalid CPF: ${CPF}`)
    this.name = 'InvalidCPF'
  }
}
