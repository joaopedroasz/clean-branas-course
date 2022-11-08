import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const freight = readFileSync(resolve(__dirname, 'Freight.gql'), { encoding: 'utf-8' })

export default [freight]
