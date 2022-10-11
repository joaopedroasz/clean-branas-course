export class ForbiddenActionError extends Error {
  constructor (reason: string) {
    super(`Forbidden Action: ${reason}`)
    this.name = 'ForbiddenActionError'
  }
}
