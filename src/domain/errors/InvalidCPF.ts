export class InvalidCPFerror extends Error {
  constructor (cpf: string) {
    super(`Invalid CPF: ${cpf}`)
  }
}
