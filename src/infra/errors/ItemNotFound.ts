export class ItemNotFoundError extends Error {
  constructor (id: string) {
    super(`Item with id ${id} was not found`)
  }
}
