import { GetItemsByIds } from '@/application/contracts'
import { GetItemsByIdsHttp, GetItemsByIdsHttpInput, GetItemsByIdsHttpOutput, HttpResponse } from '../contracts'
import { MissingParamError } from '../errors'
import { badRequest, ok, serverError, unknownError } from '../helpers'

export class GetItemsByIdsHttpController implements GetItemsByIdsHttp {
  private readonly getItemsByIds: GetItemsByIds

  constructor (getItemsByIds: GetItemsByIds) {
    this.getItemsByIds = getItemsByIds
  }

  public async handle ({ itemsIds }: GetItemsByIdsHttpInput): Promise<HttpResponse<GetItemsByIdsHttpOutput | Error>> {
    try {
      if (!itemsIds) return badRequest(new MissingParamError('itemsIds'))

      const output = await this.getItemsByIds.execute({ ids: itemsIds.split(',') })

      return ok<GetItemsByIdsHttpOutput>(output)
    } catch (error) {
      const isError = error instanceof Error
      if (!isError) return unknownError(error)

      return serverError(error)
    }
  }
}
