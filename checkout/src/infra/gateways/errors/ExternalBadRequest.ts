import { HttpError } from './HttpError'

export class ExternalBadRequestError extends HttpError {
  constructor (data: any) {
    super({ data, status: 400 })
    this.name = 'ExternalBadRequestError'
  }
}
