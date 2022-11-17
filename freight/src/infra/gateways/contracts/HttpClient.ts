export type RequestParams = {
  url: string
  params?: Record<string, any>
}

export interface HttpClient {
  get: <Response = any> (params: RequestParams) => Promise<Response>
}
