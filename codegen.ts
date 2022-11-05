import type { CodegenConfig } from '@graphql-codegen/cli'
import { resolve } from 'node:path'

const config: CodegenConfig = {
  schema: resolve(__dirname, 'src', 'infra', 'http', 'graphql', 'typeDefs', '*.gql'),
  generates: {
    './src/infra/http/graphql/types/generated-resolvers.ts': {
      config: {
        useIndexSignature: true
      },
      plugins: ['typescript', 'typescript-resolvers']
    }
  }
}
export default config
