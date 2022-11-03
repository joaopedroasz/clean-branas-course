import { HttpResponse } from '../contracts'

export const badRequest = (error: Error): HttpResponse<Error> => ({
  statusCode: 400,
  body: error
})

export const ok = <ResponseBody = Record<string, any>>(body: ResponseBody): HttpResponse<ResponseBody> => ({
  statusCode: 200,
  body
})
