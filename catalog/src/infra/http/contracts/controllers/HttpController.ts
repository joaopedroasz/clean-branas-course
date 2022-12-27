import { HttpResponse } from '../http'

export interface HttpController<Input = any, Output = any> {
  handle: (input: Input) => Promise<HttpResponse<Output>>
}
