import { Item } from '@/domain/entities'
import { ItemRepository } from '@/domain/repositories'

export class ItemRepositoryStub implements ItemRepository {
  public async getById (id: string): Promise<Item> {
    return new Item({
      id,
      category: 'Categoria do Item',
      description: 'Descrição do Item',
      price: 100,
      heightInCM: 10,
      widthInCM: 10,
      depthInCM: 20,
      weightInCM: 10
    })
  }
}
