import { ZipCode, ZipCodeProps } from '@/domain/entities'

const makeSut = (props?: Partial<ZipCodeProps>): ZipCode => new ZipCode({
  code: '12345-678',
  idCity: 'any_id_city',
  street: 'any_street',
  neighborhood: 'any_neighborhood',
  ...props
})

describe('ZipCode Entity', () => {
  it('should create a valid zip code instance', () => {
    const sut = makeSut()

    expect(sut).toBeDefined()
  })
})
