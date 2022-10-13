import { Item, ItemProps } from '@/Item'
import { FreightCalculator, FreightCalculatorProps } from '@/FreightCalculator'

const makeSut = (props: FreightCalculatorProps): FreightCalculator => new FreightCalculator(props)
const makeItem = (props?: Partial<ItemProps>): Item => new Item({
  id: 'any_id',
  description: 'Fridge',
  price: 10,
  heightInCm: 200,
  depthInCm: 50,
  weightInKg: 40,
  widthInCm: 100,
  ...props
})

describe('Freight Calculator', () => {
  it('should calculate freight by item and quantity', () => {
    const item = makeItem()
    const quantity = 2
    const sut = makeSut({
      item,
      quantity
    })

    const freight = sut.calculate()

    expect(freight).toBe(800)
  })

  it('should return 10 as minimum freight', () => {
    const weightInKg = 1
    const heightInCm = 20
    const widthInCm = 15
    const depthInCm = 10
    const item = makeItem({ weightInKg, heightInCm, widthInCm, depthInCm })
    const sut = makeSut({ quantity: 1, item })

    const freight = sut.calculate()

    expect(freight).toBe(10)
  })
})
