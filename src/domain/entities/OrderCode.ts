export type OrderCodeProps = {
  date: Date
  sequence: number
}

export class OrderCode {
  private readonly SEQUENCE_LENGTH = 8

  private readonly code: string

  constructor ({
    date,
    sequence
  }: OrderCodeProps) {
    this.code = this.generate(date, sequence)
  }

  private generate (date: Date, sequence: number): string {
    const year = date.getFullYear()
    const nextSequence = sequence + 1
    const sequenceString = nextSequence.toString().padStart(this.SEQUENCE_LENGTH, '0')
    return `${year}${sequenceString}`
  }

  public getCode (): string {
    return this.code
  }
}
