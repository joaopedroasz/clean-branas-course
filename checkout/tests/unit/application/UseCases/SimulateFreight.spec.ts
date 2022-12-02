import { Item, ItemProps } from '@/domain/entities'
import { GetItemByIdRepository } from '@/domain/repositories/Item'
import { CalculateFreightGateway, CalculateFreightInput, CalculateFreightOutput, SimulateFreight } from '@/application/contracts'
import { SimulateFreightUseCase } from '@/application/UseCases'
import { SimulateFreightInputDTO } from '@/application/DTOs'

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

const makeCalculateFreightGateway = (): CalculateFreightGateway => ({
  calculate: async (input: CalculateFreightInput): Promise<CalculateFreightOutput> => ({
    freight: 10
  })
})

type SutTypes = {
  sut: SimulateFreight
  getItemByIdRepository: GetItemByIdRepository
  calculateFreightGateway: CalculateFreightGateway
}

const makeSut = (): SutTypes => {
  const getItemByIdRepository = makeGetItemByIdRepository()
  const calculateFreightGateway = makeCalculateFreightGateway()
  const sut = new SimulateFreightUseCase(
    getItemByIdRepository,
    calculateFreightGateway
  )
  return {
    sut,
    getItemByIdRepository,
    calculateFreightGateway
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
      ],
      destinationCEP: 'any_cep',
      originCEP: 'any_cep'
    }

    const output = await sut.execute(input)

    expect(output.total).toBe(10)
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
      ],
      destinationCEP: 'any_cep',
      originCEP: 'any_cep'
    }

    await sut.execute(input)

    expect(getItemByIdRepositorySpy).toBeCalledTimes(2)
    expect(getItemByIdRepositorySpy).toBeCalledWith('1')
    expect(getItemByIdRepositorySpy).toBeCalledWith('2')
  })

  it('should calculate freight with distance between origin and provided destination', async () => {
    const { sut } = makeSut()
    const input: SimulateFreightInputDTO = {
      items: [
        {
          itemId: '1',
          quantity: 1
        }
      ],
      destinationCEP: 'any_cep',
      originCEP: 'any_cep'
    }

    const output = await sut.execute(input)

    expect(output.total).toBe(10)
  })

  it('should call CalculateFreightGateway with loaded items', async () => {
    const { sut, calculateFreightGateway } = makeSut()
    const calculateFreightGatewaySpy = vi.spyOn(calculateFreightGateway, 'calculate')
    const input: SimulateFreightInputDTO = {
      items: [
        {
          itemId: '1',
          quantity: 1
        }
      ],
      destinationCEP: 'any_cep',
      originCEP: 'any_cep'
    }

    await sut.execute(input)

    expect(calculateFreightGatewaySpy).toBeCalledTimes(1)
    expect(calculateFreightGatewaySpy).toBeCalledWith({
      items: [
        {
          volume: 0.001,
          density: 10000,
          quantity: 1
        }
      ],
      from: 'any_cep',
      to: 'any_cep'
    })
  })
})
