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
  it('should call axios with correct values', async () => {
    const { sut } = makeSut()

    await sut.get({ url: 'any_url' })

    expect(axios.get).toHaveBeenCalledWith('any_url')
  })
})
