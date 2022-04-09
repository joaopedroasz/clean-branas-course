export class EntityNotFountError extends Error {
  constructor (entityName: string, id: string) {
    super(`${entityName} entity with id ${id} was not found`)
  }
}
