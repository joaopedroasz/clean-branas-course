export interface CountOrdersRepository {
  count: () => Promise<number>
}
