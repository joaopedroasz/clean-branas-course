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
      const { body: response, statusCode } = await controller.handle(request)
      if (statusCode >= 200 && statusCode <= 299) {
        res.status(statusCode).json(response)
      } else {
        res.status(statusCode).json({
          error: response.message
        })
      }
    })
  }

  listen (port: number): void {
    this.server.listen(port)
  }
}
