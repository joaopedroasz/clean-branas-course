export type SearchOrdersByCPFInputProps = {
  CPF: string
}

export class SearchOrdersByCPFInput {
  public readonly CPF: string

  constructor ({ CPF }: SearchOrdersByCPFInputProps) {
    this.CPF = CPF
  }
}
