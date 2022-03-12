import pgp from 'pg-promise'
import { DatabaseConnection } from '../../contracts'

export class DatabaseConnectionAdapter implements DatabaseConnection {
  private readonly pgPromise: any

  constructor () {
    this.pgPromise = pgp()({
      host: 'localhost',
      port: 5432,
      database: 'clean_database',
      user: 'clean_admin',
      password: 'clean_password',
      allowExitOnIdle: true
    })
  }

  public async query<ParamsType, ResultType>(statement: string, params: ParamsType): Promise<ResultType> {
    return await this.pgPromise.query(statement, params)
  }
}
