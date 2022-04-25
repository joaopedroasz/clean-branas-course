import { SearchOrderByCodeInputProps } from './types'

export class SearchOrderByCodeInput {
  public readonly orderCode: string

  constructor ({
    orderCode
  }: SearchOrderByCodeInputProps) {
    this.orderCode = orderCode
  }
}
