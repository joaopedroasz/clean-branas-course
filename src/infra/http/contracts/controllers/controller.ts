import { HttpResponse } from '../http'

type Default = Record<string, any>

export interface HttpController<Request = Default, ResponseBody = Default> {
  handle: (request: Request) => Promise<HttpResponse<ResponseBody>>
}
