import { GraphQLError } from 'graphql'
import { ApolloServer } from '@apollo/server'
import { ApolloServerErrorCode } from '@apollo/server/errors'
import { startStandaloneServer } from '@apollo/server/standalone'
import { makeExecutableSchema } from '@graphql-tools/schema'

import typeDefs from './typeDefs'
import resolvers from './resolvers'

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

const handleErrors = (response: any, errors?: readonly GraphQLError[]): void => {
  if (!errors) return

  errors.forEach((error) => {
    if (checkErrorCode(error, ApolloServerErrorCode.BAD_REQUEST)) {
      response.http.status = 400
    } else {
      response.http.status = 500
    }
  })
}

const checkErrorCode = (error: GraphQLError, code: ApolloServerErrorCode): boolean => {
  return error.extensions?.code === code
}

const apolloServer = (): ApolloServer => {
  return new ApolloServer({
    schema,
    plugins: [{
      requestDidStart: async () => ({
        willSendResponse: async ({ response, errors }) => handleErrors(response, errors)
      })
    }]
  })
}

export const setupGraphQLServer = async (port?: number): Promise<{ server: ApolloServer, url: string }> => {
  const server = apolloServer()
  const { url } = await startStandaloneServer(server, {
    listen: {
      port: port ?? 4000
    }
  })
  return {
    server,
    url
  }
}
