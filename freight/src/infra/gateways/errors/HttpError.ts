type HttpErrorProps = {
  status: number
  data: any
}

export class HttpError extends Error {
  public readonly status: number
  public readonly body: any

  constructor ({ data, status }: HttpErrorProps) {
    super(`HttpError: ${status}`)
    this.status = status
    this.body = data
    this.name = 'HttpError'
  }
}
