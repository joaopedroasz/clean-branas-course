import { HttpResponse } from '../http'

export interface HttpController<Request = any, ResponseBody = any> {
  handle: (request: Request) => Promise<HttpResponse<ResponseBody>>
}
