import { CPF } from './CPF'

export type OrderProps = {
  buyerCPF: string
}

export class Order {
  private readonly buyerCPF: CPF

  constructor ({
    buyerCPF
  }: OrderProps) {
    this.buyerCPF = new CPF(buyerCPF)
  }
}
