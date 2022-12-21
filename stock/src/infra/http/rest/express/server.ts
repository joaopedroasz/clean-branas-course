import express, { Application, Request, Response, json } from 'express'

import { HttpController, RestMethod, ServerHttpRest } from '@/infra/http'

export class ServerHttpRestExpressAdapter implements ServerHttpRest {
  public readonly server: Application

  constructor () {
    this.server = express()
    this.server.use(json())
  }

  public on (method: RestMethod, path: string, controller: HttpController): void {
    this.server[method](path, async (req: Request, res: Response) => {
      const { body, params, query } = req
      const request = {
        ...(body ?? {}),
        ...(params ?? {}),
        ...(query ?? {})
      }
      const httpResponse = await controller.handle(request)
      if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
        res.status(httpResponse.statusCode).json(httpResponse.body)
      } else {
        res.status(httpResponse.statusCode).json({
          error: httpResponse.body.message
        })
      }
    })
  }

  listen (port: number): void {
    this.server.listen(port)
  }
}
