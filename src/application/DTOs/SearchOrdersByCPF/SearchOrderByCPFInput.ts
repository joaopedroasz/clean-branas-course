export type SearchOrdersByCPFInputProps = {
  CPF: string
}

export class SearchOrdersByCPFInputDTO {
  public readonly CPF: string

  constructor ({ CPF }: SearchOrdersByCPFInputProps) {
    this.CPF = CPF
  }
}
