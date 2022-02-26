import { Item } from '@/domain/entities'
import { ItemRepository } from '@/domain/repositories'

export class ItemRepositoryStub implements ItemRepository {
  public async getById (id: string): Promise<Item> {
    return new Item('Categoria do Item', 'Descrição do Item', 100, 10, 10, 10, 10, id)
  }
}
