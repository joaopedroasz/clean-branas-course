export type RequestParams = {
  url: string
  params?: Record<string, any>
}

export type PostRequestParams = RequestParams & {
  body?: Record<string, any>
}

export interface HttpClient {
  get: <Response = any> (params: RequestParams) => Promise<Response>
  post: <Response = any> (params: PostRequestParams) => Promise<Response>
}
