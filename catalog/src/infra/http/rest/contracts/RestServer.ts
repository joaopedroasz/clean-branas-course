import { HttpController } from '../../contracts'

export type RestMethod = 'get' | 'post' | 'put' | 'delete'

export interface ServerHttpRest {
  listen: (port: number) => void
  on: (method: RestMethod, path: string, controller: HttpController) => void
}
