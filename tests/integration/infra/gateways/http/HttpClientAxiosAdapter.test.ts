import axios from 'axios'

import { HttpClient, HttpClientAxiosAdapter } from '@/infra/gateways'

vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
    create: vi.fn()
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
})
