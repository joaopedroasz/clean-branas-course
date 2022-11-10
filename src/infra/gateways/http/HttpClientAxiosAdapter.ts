import axios from 'axios'

import { HttpClient, RequestParams } from '../contracts'
import { ExternalBadRequestError, ExternalServerError, HttpError } from '../errors'

export class HttpClientAxiosAdapter implements HttpClient {
  public async get <Response>({ url, params }: RequestParams): Promise<Response> {
    try {
      const response = await axios.get<Response>(url, { params })

      return response.data
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error

      const httpErrors: Record<number, typeof HttpError> = {
        400: ExternalBadRequestError,
        404: ExternalBadRequestError,
        500: ExternalServerError
      }

      const ErrorConstructor = httpErrors[error.response?.status ?? 500]

      throw new ErrorConstructor(error.response?.data)
    }
  }
}
