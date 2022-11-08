import { GraphQLError } from 'graphql'
import { ApolloServerErrorCode } from '@apollo/server/errors'

export type ApolloServerErrorProps = {
  message: string
  serverErrorCode?: ApolloServerErrorCode
}

export class ApolloServerError extends GraphQLError {
  constructor ({ message, serverErrorCode }: ApolloServerErrorProps) {
    super(message, {
      extensions: {
        code: serverErrorCode
      }
    })
  }
}
