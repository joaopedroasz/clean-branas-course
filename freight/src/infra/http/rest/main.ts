import { ServerHttpRestExpressAdapter } from './express'
import { CalculateFreightRoute } from './routes'

const expressServer = new ServerHttpRestExpressAdapter()
new CalculateFreightRoute(expressServer)

expressServer.listen(4001)
