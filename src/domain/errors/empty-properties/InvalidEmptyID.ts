import { InvalidEmptyPropertyError } from './InvalidEmptyProperty'

export class InvalidEmptyIdError extends InvalidEmptyPropertyError {
  constructor () {
    super('id')
  }
}
