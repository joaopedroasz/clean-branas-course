import { HttpResponse } from '../contracts'

export const badRequest = (error: Error): HttpResponse<Error> => ({
  statusCode: 400,
  body: error
})

export const success = <T>(data: T): HttpResponse<T> => ({
  statusCode: 200,
  body: data
})

export const unknownServerError = (error: any): HttpResponse<Error> => ({
  statusCode: 500,
  body: new Error(error)
})

export const serverError = (error: Error): HttpResponse<Error> => ({
  statusCode: 500,
  body: error
})
