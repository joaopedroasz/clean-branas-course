import { PrismaClientSingleton } from './infra/database'
import { setupGraphQLServer } from './infra/http'

async function main (): Promise<void> {
  const prismaClient = PrismaClientSingleton.getInstance()
  await prismaClient.$connect()

  const { url } = await setupGraphQLServer(3000)

  console.log(`Server is running at ${url} 🌵🚀`)
}

main().catch(console.error)
