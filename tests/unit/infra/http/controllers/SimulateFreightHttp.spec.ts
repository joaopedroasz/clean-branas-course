import { SimulateFreightHttp, SimulateFreightHttpController, SimulateFreightHttpInputDTO } from '@/infra/http'
import { MissingParamError } from '@/infra/http/errors'

type SutType = {
  sut: SimulateFreightHttp
}

const makeSut = (): SutType => {
  const sut = new SimulateFreightHttpController()
  return {
    sut
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
})
