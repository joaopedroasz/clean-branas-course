import { HttpController } from '../../contracts'

export type RestMethod = 'get' | 'post' | 'put' | 'delete'

export interface ServerHttpRest {
  listen: (port: number) => void
  on: (event: string, path: string, controller: HttpController) => void
}
