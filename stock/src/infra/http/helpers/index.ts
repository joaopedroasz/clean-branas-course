import { HttpResponse } from '../contracts'

export const badRequest = (error: Error): HttpResponse<Error> => ({
  statusCode: 400,
  body: error
})

export const success = <T>(data: T): HttpResponse<T> => ({
  statusCode: 200,
  body: data
})
