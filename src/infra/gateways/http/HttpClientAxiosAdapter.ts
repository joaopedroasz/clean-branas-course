import axios from 'axios'

import { HttpClient, RequestParams } from '../contracts'

export class HttpClientAxiosAdapter implements HttpClient {
  public async get <Response>(params: RequestParams): Promise<Response> {
    await axios.get<Response>(params.url)

    return {} as unknown as Response
  }
}
