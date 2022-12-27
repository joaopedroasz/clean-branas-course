import { GetItemsByIds } from '@/application/contracts'
import { GetItemsByIdsHttp, GetItemsByIdsHttpInput, GetItemsByIdsHttpOutput } from '../contracts'
import { MissingParamError } from '../errors'
import { badRequest } from '../helpers'

export class GetItemsByIdsHttpController implements GetItemsByIdsHttp {
  private readonly getItemsByIds: GetItemsByIds

  constructor (getItemsByIds: GetItemsByIds) {
    this.getItemsByIds = getItemsByIds
  }

  public async handle ({ itemsIds }: GetItemsByIdsHttpInput): Promise<GetItemsByIdsHttpOutput> {
    if (!itemsIds) return badRequest(new MissingParamError('itemsIds'))

    await this.getItemsByIds.execute({ ids: itemsIds.split(',') })

    return {
      items: []
    }
  }
}
