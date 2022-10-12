import { InvalidDimensionError } from '@/InvalidDimension'

export type DimensionsProps = {
  heightInCm: number
  widthInCm: number
  depthInCm: number
}

export class Dimensions {
  private readonly heightInCm: number
  private readonly widthInCm: number
  private readonly depthInCm: number

  constructor ({ heightInCm, widthInCm, depthInCm }: DimensionsProps) {
    this.heightInCm = heightInCm
    this.widthInCm = widthInCm
    this.depthInCm = depthInCm

    if (!this.isValidDimension(heightInCm)) throw new InvalidDimensionError({ propertyName: 'heightInCm', value: heightInCm })
    if (!this.isValidDimension(widthInCm)) throw new InvalidDimensionError({ propertyName: 'widthInCm', value: widthInCm })
    if (!this.isValidDimension(depthInCm)) throw new InvalidDimensionError({ propertyName: 'depthInCm', value: depthInCm })
  }

  private isValidDimension (value: number): boolean {
    return value > 0
  }

  public calculateVolume (): number {
    return this.heightInCm * this.widthInCm * this.depthInCm
  }
}
