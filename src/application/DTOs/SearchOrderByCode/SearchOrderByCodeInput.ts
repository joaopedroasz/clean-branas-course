type SearchOrderByCodeInputProps = {
  code: string
}

export class SearchOrderByCodeInput {
  public readonly code: string

  constructor ({ code }: SearchOrderByCodeInputProps) {
    this.code = code
  }
}
