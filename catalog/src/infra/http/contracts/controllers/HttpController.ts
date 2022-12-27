type Default = Record<string, any>

export interface HttpController<Input = Default, Output = Default> {
  handle: (input: Input) => Promise<Output>
}
