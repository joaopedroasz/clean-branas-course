import { HttpResponse } from '../contracts'

export const badRequest = (error: Error): HttpResponse<Error> => ({
  statusCode: 400,
  body: error
})

export const success = <ResponseBody = Record<string, any>>(body: ResponseBody): HttpResponse<ResponseBody> => ({
  statusCode: 200,
  body
})

export const serverError = (error: Error): HttpResponse<Error> => ({
  statusCode: 500,
  body: error
})

export const unknownError = (error: any): HttpResponse<Error> => ({
  statusCode: 500,
  body: new Error(error)
})
