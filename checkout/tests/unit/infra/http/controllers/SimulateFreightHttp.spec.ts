import { SimulateFreight } from '@/application/contracts'
import {
  SimulateFreightHttp,
  SimulateFreightHttpController,
  SimulateFreightHttpInputDTO,
  MissingParamError,
  serverError,
  unknownError,
  badRequest
} from '@/infra/http'
import { ExternalBadRequestError } from '@/infra/gateways'

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
  it('should return badRequest if no from_CEP provided', async () => {
    const { sut } = makeSut()
    const request: SimulateFreightHttpInputDTO = {
      from_cep: '',
      to_cep: 'any_cep',
      items: [
        {
          item_id: 'any_item_id',
          quantity: 1
        }
      ]
    }

    const response = await sut.handle(request)

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('from_cep'))
  })

  it('should return badRequest if no to_CEP provided', async () => {
    const { sut } = makeSut()
    const request: SimulateFreightHttpInputDTO = {
      from_cep: 'any_cep',
      to_cep: '',
      items: [
        {
          item_id: 'any_item_id',
          quantity: 1
        }
      ]
    }

    const response = await sut.handle(request)

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('to_cep'))
  })

  it('should return badRequest if no items provided', async () => {
    const { sut } = makeSut()
    const request: SimulateFreightHttpInputDTO = {
      from_cep: 'any_cep',
      to_cep: 'any_cep',
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
      from_cep: 'any_from_cep',
      to_cep: 'any_to_cep',
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
      destinationCEP: 'any_to_cep',
      originCEP: 'any_from_cep',
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
      from_cep: 'any_cep',
      to_cep: 'any_cep',
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
      from_cep: 'any_cep',
      to_cep: 'any_cep',
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
      from_cep: 'any_cep',
      to_cep: 'any_cep',
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

  it('should return badRequest if SimulateFreight use case throws an ExternalBadRequest', async () => {
    const { sut, simulateFreight } = makeSut()
    vi.spyOn(simulateFreight, 'execute').mockRejectedValueOnce(new ExternalBadRequestError('any_error'))
    const request: SimulateFreightHttpInputDTO = {
      from_cep: 'any_cep',
      to_cep: 'any_cep',
      items: [
        {
          item_id: 'any_item_id',
          quantity: 1
        }
      ]
    }

    const response = await sut.handle(request)

    expect(response).toEqual(badRequest(new ExternalBadRequestError('any_error')))
  })
})
