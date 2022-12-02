import axios from 'axios'

import { ExternalBadRequestError, ExternalServerError, HttpClient, HttpClientAxiosAdapter } from '@/infra/gateways'

vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
    create: vi.fn(),
    isAxiosError: vi.fn(),
    post: vi.fn()
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
    vi.mocked(axios.post).mockResolvedValue({ data: {} })
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

  it('should throw ExternalBadRequestError if axios throws with status code 400', async () => {
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

  it('should throw ExternalServerError if axios throws with status code 500', async () => {
    const { sut } = makeSut()
    vi.mocked(axios.get).mockRejectedValueOnce({
      response: {
        status: 500,
        data: { errorProp: 'errorValue' }
      }
    })
    vi.mocked(axios.isAxiosError).mockReturnValueOnce(true)

    const promise = sut.get({ url: 'any_url' })

    await expect(promise).rejects.toThrow(new ExternalServerError({ errorProp: 'errorValue' }))
  })

  it('should throw ExternalServerError by default if axios throw an AxiosError but not provide status code', async () => {
    const { sut } = makeSut()
    vi.mocked(axios.get).mockRejectedValueOnce({
      response: {
        data: { errorProp: 'errorValue' }
      }
    })
    vi.mocked(axios.isAxiosError).mockReturnValueOnce(true)

    const promise = sut.get({ url: 'any_url' })

    await expect(promise).rejects.toThrow(new ExternalServerError({ errorProp: 'errorValue' }))
  })

  it('should throw ExternalBadRequest if axios throws with code 404', async () => {
    const { sut } = makeSut()
    vi.mocked(axios.get).mockRejectedValueOnce({
      response: {
        status: 404,
        data: { errorProp: 'errorValue' }
      }
    })
    vi.mocked(axios.isAxiosError).mockReturnValueOnce(true)

    const promise = sut.get({ url: 'any_url' })

    await expect(promise).rejects.toThrow(new ExternalBadRequestError({ errorProp: 'errorValue' }))
  })

  it('should call axios.post with correct values', async () => {
    const { sut } = makeSut()

    await sut.post({ url: 'any_url', body: { anyProp: 'anyValue' }, params: { anyParam: 'anyValue' } })

    expect(axios.post).toHaveBeenCalledWith('any_url', { anyProp: 'anyValue' }, { params: { anyParam: 'anyValue' } })
  })
})
