import axios from 'axios'

import { HttpClient, RequestParams } from '../contracts'
import { ExternalBadRequestError } from '../errors'

export class HttpClientAxiosAdapter implements HttpClient {
  public async get <Response>({ url, params }: RequestParams): Promise<Response> {
    try {
      const response = await axios.get<Response>(url, { params })

      return response.data
    } catch (error) {
      if (!axios.isAxiosError(error)) throw error

      throw new ExternalBadRequestError(error.response?.data)
    }
  }
}
