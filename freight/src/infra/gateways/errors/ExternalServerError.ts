import { HttpError } from './HttpError'

export class ExternalServerError extends HttpError {
  constructor (error: any) {
    super({
      status: 500,
      data: error
    })
    this.name = 'ExternalServerError'
  }
}
