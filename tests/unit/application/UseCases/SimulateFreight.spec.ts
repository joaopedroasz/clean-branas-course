import { Coordinates, FreightCalculator, Item, ItemProps } from '@/domain/entities'
import { GetItemByIdRepository } from '@/domain/repositories/Item'
import { GetCoordinateByCEPGateway } from '@/domain/gateways/Coordinates'
import { SimulateFreight } from '@/application/contracts'
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

const makeGetCoordinateByCEPGateway = (): GetCoordinateByCEPGateway => ({
  getByCEP: async (CEP: string): Promise<Coordinates> => new Coordinates({
    latitude: 0,
    longitude: 1
  })
})

type SutTypes = {
  sut: SimulateFreight
  getItemByIdRepository: GetItemByIdRepository
  getCoordinateByCEPGateway: GetCoordinateByCEPGateway
}

const makeSut = (): SutTypes => {
  const getItemByIdRepository = makeGetItemByIdRepository()
  const getCoordinateByCEPGateway = makeGetCoordinateByCEPGateway()
  const sut = new SimulateFreightUseCase(
    getItemByIdRepository,
    getCoordinateByCEPGateway
  )
  return {
    sut,
    getItemByIdRepository,
    getCoordinateByCEPGateway
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
      destinationCEP: 'any_cep'
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
      ],
      destinationCEP: 'any_cep'
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
      ],
      destinationCEP: 'any_cep'
    }

    await sut.execute(input)

    expect(freightCalculatorSpy).toBeCalledTimes(2)
  })

  it('should call GetCoordinateByCEP correctly', async () => {
    const { sut, getCoordinateByCEPGateway } = makeSut()
    const getCoordinatesByCEPSpy = vi.spyOn(getCoordinateByCEPGateway, 'getByCEP')
    const input: SimulateFreightInputDTO = {
      items: [
        {
          itemId: '1',
          quantity: 1
        }
      ],
      destinationCEP: 'any_cep'
    }

    await sut.execute(input)

    expect(getCoordinatesByCEPSpy).toBeCalledTimes(1)
    expect(getCoordinatesByCEPSpy).toBeCalledWith('any_cep')
  })
})
