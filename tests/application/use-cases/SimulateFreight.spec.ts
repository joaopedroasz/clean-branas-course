import { SimulateFreight } from '@/application/use-cases'

type makeSutTypes = {
  simulateFreight: SimulateFreight
}

const makeSut = (): makeSutTypes => {
  const simulateFreight = new SimulateFreight()

  return {
    simulateFreight
  }
}

describe('Simulate Freight use case', () => {
  const { simulateFreight } = makeSut()

  test('should create a simulate freight', () => {
    expect(simulateFreight).toBeDefined()
  })
})
