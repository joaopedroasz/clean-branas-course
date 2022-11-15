import { ForbiddenActionError } from './ForbiddenAction'

export class ForbiddenAddDuplicatedItemError extends ForbiddenActionError {
  constructor (duplicatedItemId: string) {
    super(`Item ${duplicatedItemId} already added`)
  }
}
