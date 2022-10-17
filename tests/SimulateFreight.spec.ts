import { SimulateFreight } from '@/SimulateFreight'
import { SimulateFreightUseCase } from '@/SimulateFreightUseCase'
import { SimulateFreightInputDTO } from '@/SimulateFreightInput'
import { GetItemByIdRepository } from '@/GetItemByIdRepository'
import { Item, ItemProps } from '@/Item'
import { FreightCalculator } from '@/FreightCalculator'

const makeItem = (props?: Partial<ItemProps>): Item => new Item({
  id: 'any_id',
  description: 'any_description',
  price: 10,
  depthInCm: 10,
  heightInCm: 10,
  weightInKg: 10,
  widthInCm: 10,
  ...props
})

const makeGetItemByIdRepository = (): GetItemByIdRepository => ({
  getById: async (id: string): Promise<Item> => makeItem({ id })
})

type SutTypes = {
  sut: SimulateFreight
  getItemByIdRepository: GetItemByIdRepository
}

const makeSut = (): SutTypes => {
  const getItemByIdRepository = makeGetItemByIdRepository()
  const sut = new SimulateFreightUseCase(getItemByIdRepository)
  return {
    sut,
    getItemByIdRepository
  }
}

describe('SimulateFreight Use Case', () => {
  it('should return total freight by items and quantities', async () => {
    const { sut } = makeSut()
    const input: SimulateFreightInputDTO = {
      items: [
        {
          itemId: '1',
          quantity: 1
        },
        {
          itemId: '2',
          quantity: 1
        }
      ]
    }

    const output = await sut.execute(input)

    expect(output.total).toBe(200)
  })

  it('should call GetItemByIdRepository correctly', async () => {
    const { sut, getItemByIdRepository } = makeSut()
    const getItemByIdRepositorySpy = vi.spyOn(getItemByIdRepository, 'getById')
    const input: SimulateFreightInputDTO = {
      items: [
        {
          itemId: '1',
          quantity: 1
        },
        {
          itemId: '2',
          quantity: 2
        }
      ]
    }

    await sut.execute(input)

    expect(getItemByIdRepositorySpy).toBeCalledTimes(2)
    expect(getItemByIdRepositorySpy).toBeCalledWith('1')
    expect(getItemByIdRepositorySpy).toBeCalledWith('2')
  })

  it('should call FreightCalculator correctly', async () => {
    const { sut } = makeSut()
    const freightCalculatorSpy = vi.spyOn(FreightCalculator.prototype, 'calculate')
    const input: SimulateFreightInputDTO = {
      items: [
        {
          itemId: '1',
          quantity: 1
        },
        {
          itemId: '2',
          quantity: 2
        }
      ]
    }

    await sut.execute(input)

    expect(freightCalculatorSpy).toBeCalledTimes(2)
  })
})
