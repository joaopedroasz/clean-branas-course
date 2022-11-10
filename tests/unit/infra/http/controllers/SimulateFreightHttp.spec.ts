import { SimulateFreight } from '@/application/contracts'
import {
  SimulateFreightHttp,
  SimulateFreightHttpController,
  SimulateFreightHttpInputDTO,
  MissingParamError,
  serverError,
  unknownError
} from '@/infra/http'

type SutType = {
  sut: SimulateFreightHttp
  simulateFreight: SimulateFreight
}

const makeSimulateFreight = (): SimulateFreight => ({
  execute: async () => ({
    total: 10
  })
})

const makeSut = (): SutType => {
  const simulateFreight = makeSimulateFreight()
  const sut = new SimulateFreightHttpController(simulateFreight)
  return {
    sut,
    simulateFreight
  }
}

describe('SimulateFreightHttpController', () => {
  it('should return badRequest if no CEP provided', async () => {
    const { sut } = makeSut()
    const request: SimulateFreightHttpInputDTO = {
      cep: '',
      items: [
        {
          item_id: 'any_item_id',
          quantity: 1
        }
      ]
    }

    const response = await sut.handle(request)

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('cep'))
  })

  it('should return badRequest if no items provided', async () => {
    const { sut } = makeSut()
    const request: SimulateFreightHttpInputDTO = {
      cep: 'any_cep',
      items: []
    }

    const response = await sut.handle(request)

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('items'))
  })

  it('should call SimulateFreight use case with correct values', async () => {
    const { sut, simulateFreight } = makeSut()
    const simulateFreightSpy = vi.spyOn(simulateFreight, 'execute')
    const request: SimulateFreightHttpInputDTO = {
      cep: 'any_cep',
      items: [
        {
          item_id: 'any_item_id',
          quantity: 1
        }
      ]
    }

    await sut.handle(request)

    expect(simulateFreightSpy).toHaveBeenCalledTimes(1)
    expect(simulateFreightSpy).toHaveBeenCalledWith({
      destinationCEP: 'any_cep',
      items: [
        {
          itemId: 'any_item_id',
          quantity: 1
        }
      ]
    })
  })

  it('should return calculated freight by SimulateFreight use case', async () => {
    const { sut } = makeSut()
    const request: SimulateFreightHttpInputDTO = {
      cep: 'any_cep',
      items: [
        {
          item_id: 'any_item_id',
          quantity: 1
        }
      ]
    }

    const response = await sut.handle(request)

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      freight: 10
    })
  })

  it('should return serverError if SimulateFreight use case throws', async () => {
    const { sut, simulateFreight } = makeSut()
    vi.spyOn(simulateFreight, 'execute').mockRejectedValueOnce(new Error())
    const request: SimulateFreightHttpInputDTO = {
      cep: 'any_cep',
      items: [
        {
          item_id: 'any_item_id',
          quantity: 1
        }
      ]
    }

    const response = await sut.handle(request)

    expect(response).toEqual(serverError(new Error()))
  })

  it('should return unknownServerError if SimulateFreight use case throws an unknown error', async () => {
    const { sut, simulateFreight } = makeSut()
    vi.spyOn(simulateFreight, 'execute').mockRejectedValueOnce('any_error')
    const request: SimulateFreightHttpInputDTO = {
      cep: 'any_cep',
      items: [
        {
          item_id: 'any_item_id',
          quantity: 1
        }
      ]
    }

    const response = await sut.handle(request)

    expect(response).toEqual(unknownError('any_error'))
  })
})
