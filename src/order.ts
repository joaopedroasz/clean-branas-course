import { CPF } from '@/cpf'

export class Order {
  public id: string
  public orderItemIds: string[]
  public cpf: CPF

  constructor (id: string, orderItemId: string[], cpf: string) {
    this.id = id
    this.orderItemIds = orderItemId
    this.cpf = new CPF(cpf)
  }
}
