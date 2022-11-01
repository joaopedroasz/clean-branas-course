import axios from 'axios'

import { ExternalBadRequestError, HttpClient, HttpClientAxiosAdapter } from '@/infra/gateways'

vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
    create: vi.fn(),
    isAxiosError: vi.fn()
  }
}))

type SutType = {
  sut: HttpClient
}

const makeSut = (): SutType => {
  const sut = new HttpClientAxiosAdapter()
  return {
    sut
  }
}

describe('HttpClientAxiosAdapter', () => {
  beforeEach(() => {
    vi.mocked(axios.get).mockResolvedValue({ data: {} })
  })

  it('should call axios with correct values', async () => {
    const { sut } = makeSut()

    await sut.get({ url: 'any_url', params: { anyParam: 'anyValue' } })

    expect(axios.get).toHaveBeenCalledWith('any_url', { params: { anyParam: 'anyValue' } })
  })

  it('should return axios response data on success', async () => {
    const { sut } = makeSut()
    vi.mocked(axios.get).mockResolvedValueOnce({ data: 'any_data' })

    const response = await sut.get({ url: 'any_url' })

    expect(response).toEqual('any_data')
  })

  it('should rethrow ExternalBadRequestError if axios throws with status code 400', async () => {
    const { sut } = makeSut()
    vi.mocked(axios.get).mockRejectedValueOnce({
      response: {
        status: 400,
        data: { errorProp: 'errorValue' }
      }
    })
    vi.mocked(axios.isAxiosError).mockReturnValueOnce(true)

    const promise = sut.get({ url: 'any_url' })

    await expect(promise).rejects.toThrow(new ExternalBadRequestError({ errorProp: 'errorValue' }))
  })

  it('should rethrow generic error if axios throw is not AxiosError', async () => {
    const { sut } = makeSut()
    vi.mocked(axios.get).mockRejectedValueOnce(new Error('any_error'))
    vi.mocked(axios.isAxiosError).mockReturnValueOnce(false)

    const promise = sut.get({ url: 'any_url' })

    await expect(promise).rejects.toThrow(new Error('any_error'))
  })
})
