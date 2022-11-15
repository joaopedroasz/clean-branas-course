import { ApolloServerErrorCode } from '@apollo/server/errors'

import { HttpController } from '../../contracts'
import { ApolloServerError } from '../errors'

export const adaptResolver = async (controller: HttpController, args?: any): Promise<Record<string, any>> => {
  const request = args
  const response = await controller.handle(request)

  switch (response.statusCode) {
    case 200:
    case 204:
      return response.body
    case 400:
      throw new ApolloServerError({
        message: response.body.message,
        serverErrorCode: ApolloServerErrorCode.BAD_REQUEST
      })
    default:
      throw new ApolloServerError({
        message: response.body.message,
        serverErrorCode: ApolloServerErrorCode.INTERNAL_SERVER_ERROR
      })
  }
}
