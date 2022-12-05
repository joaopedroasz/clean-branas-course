export class PrismaConnectionSingleton {
  private static instance: PrismaConnectionSingleton

  private constructor () {}

  public static getInstance (): PrismaConnectionSingleton {
    if (!PrismaConnectionSingleton.instance) {
      PrismaConnectionSingleton.instance = new PrismaConnectionSingleton()
    }

    return PrismaConnectionSingleton.instance
  }
}
