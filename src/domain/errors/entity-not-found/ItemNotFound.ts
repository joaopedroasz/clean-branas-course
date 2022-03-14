import { EntityNotFount } from './EntityNotFound'

export class ItemNotFoundError extends EntityNotFount {
  constructor (id: string) {
    super('Item', id)
  }
}
