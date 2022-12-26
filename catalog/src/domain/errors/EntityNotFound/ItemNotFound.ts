import { EntityNotFoundError, EntityNotFoundProps } from './EntityNotFound'

export class ItemNotFoundError extends EntityNotFoundError {
  constructor (props: EntityNotFoundProps) {
    super('item', props)
  }
}
