import { CalculateFreight } from '@/application/contracts'
import {
  CalculateFreightHttpController,
  CalculateFreightHttpInput,
  CalculateFreightHttp,
  MissingParamError,
  serverError,
  badRequest,
  unknownError
} from '@/infra/http'
import { ExternalBadRequestError } from '@/infra/gateways'

type SutType = {
  sut: CalculateFreightHttp
  simulateFreight: CalculateFreight
}

const makeSimulateFreight = (): CalculateFreight => ({
  execute: async () => ({ freight: 10 })
})

const makeSut = (): SutType => {
  const simulateFreight = makeSimulateFreight()
  const sut = new CalculateFreightHttpController(simulateFreight)
  return {
    sut,
    simulateFreight
  }
}

describe('SimulateFreightHttpController', () => {
  it('should return badRequest if no destination provided', async () => {
    const { sut } = makeSut()
    const request: CalculateFreightHttpInput = {
      destination: '',
      origin: '01001000',
      orderItems: [
        {
          density: 1,
          volume: 1,
          quantity: 1
        }
      ]
    }

    const response = await sut.handle(request)

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('destination'))
  })

  it('should return badRequest if no origin provided', async () => {
    const { sut } = makeSut()
    const request: CalculateFreightHttpInput = {
      destination: '01001000',
      origin: '',
      orderItems: [
        {
          density: 1,
          volume: 1,
          quantity: 1
        }
      ]
    }

    const response = await sut.handle(request)

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('origin'))
  })

  it('should return badRequest if no orderItems provided', async () => {
    const { sut } = makeSut()
    const request: CalculateFreightHttpInput = {
      destination: '01001000',
      origin: '01001000',
      orderItems: []
    }

    const response = await sut.handle(request)

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('orderItems'))
  })

  it('should call SimulateFreight use case with correct values', async () => {
    const { sut, simulateFreight } = makeSut()
    const simulateFreightSpy = vi.spyOn(simulateFreight, 'execute')
    const request: CalculateFreightHttpInput = {
      origin: '01001111',
      destination: '01001000',
      orderItems: [
        {
          density: 1,
          volume: 1,
          quantity: 1
        }
      ]
    }

    await sut.handle(request)

    expect(simulateFreightSpy).toHaveBeenCalledTimes(1)
    expect(simulateFreightSpy).toHaveBeenCalledWith({
      from: '01001111',
      to: '01001000',
      orderItems: [
        {
          density: 1,
          volume: 1,
          quantity: 1
        }
      ]
    })
  })

  it('should return calculated freight by SimulateFreight use case', async () => {
    const { sut } = makeSut()
    const request: CalculateFreightHttpInput = {
      destination: '01001000',
      origin: '01001111',
      orderItems: [
        {
          density: 1,
          volume: 1,
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
    const request: CalculateFreightHttpInput = {
      destination: '01001000',
      origin: '01001111',
      orderItems: [
        {
          density: 1,
          volume: 1,
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
    const request: CalculateFreightHttpInput = {
      destination: '01001000',
      origin: '01001111',
      orderItems: [
        {
          density: 1,
          volume: 1,
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
    const request: CalculateFreightHttpInput = {
      destination: '01001000',
      origin: '01001111',
      orderItems: [
        {
          density: 1,
          volume: 1,
          quantity: 1
        }
      ]
    }

    const response = await sut.handle(request)

    expect(response).toEqual(badRequest(new ExternalBadRequestError('any_error')))
  })
})
