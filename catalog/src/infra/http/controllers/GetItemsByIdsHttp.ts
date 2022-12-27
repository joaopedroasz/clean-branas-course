import { GetItemsByIdsHttp, GetItemsByIdsHttpInput, GetItemsByIdsHttpOutput } from '../contracts'
import { MissingParamError } from '../errors'
import { badRequest } from '../helpers'

export class GetItemsByIdsHttpController implements GetItemsByIdsHttp {
  public async handle ({ itemsIds }: GetItemsByIdsHttpInput): Promise<GetItemsByIdsHttpOutput> {
    if (!itemsIds) return badRequest(new MissingParamError('itemsIds'))

    return {
      items: []
    }
  }
}
