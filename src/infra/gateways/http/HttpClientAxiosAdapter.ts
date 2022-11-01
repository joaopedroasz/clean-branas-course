import axios from 'axios'

import { HttpClient, RequestParams } from '../contracts'

export class HttpClientAxiosAdapter implements HttpClient {
  public async get <Response>({ url, params }: RequestParams): Promise<Response> {
    const response = await axios.get<Response>(url, { params })

    return response.data
  }
}
