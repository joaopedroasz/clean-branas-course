import { EntityNotFountError } from './EntityNotFound'

export class ItemNotFoundError extends EntityNotFountError {
  constructor (id: string) {
    super('Item', id)
  }
}
