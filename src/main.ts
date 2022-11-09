import { PrismaClientSingleton } from './infra/database'
import { setupGraphQLServer } from './infra/http'

const prismaClient = PrismaClientSingleton.getInstance()

async function main (): Promise<void> {
  await prismaClient.$connect()

  const { url } = await setupGraphQLServer(3000)

  console.log(`Server is running at ${url} 🌵🚀`)
}

main().catch(async error => {
  await prismaClient.$disconnect()
  console.error(error)
  process.exit(1)
})
