import { Item, ItemProps } from '@/domain/entities'

export const makeItem = (overrides?: Partial<ItemProps>): Item => new Item({
  id: 'any_id',
  depthInCm: 10,
  description: 'any_description',
  heightInCm: 10,
  price: 10,
  weightInKg: 10,
  widthInCm: 10,
  ...overrides
})
