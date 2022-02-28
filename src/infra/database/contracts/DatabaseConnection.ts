export interface DatabaseConnection {
  query: <ParamsType, ResultType>(
    statement: string,
    params: ParamsType
  ) => Promise<ResultType>
}
