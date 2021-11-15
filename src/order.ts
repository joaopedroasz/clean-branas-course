import { CPF } from '@/cpf'

export class Order {
  public id: string
  public orderItemId: string
  public cpf: CPF

  constructor (id: string, orderItemId: string, cpf: string) {
    this.id = id
    this.orderItemId = orderItemId
    this.cpf = new CPF(cpf)
  }
}
