import { InvalidDimensionError } from '@/domain/errors'

export type DimensionsProps = {
  heightInCm: number
  widthInCm: number
  depthInCm: number
}

export class Dimensions {
  private readonly CONVERT_TO_CUBIC_METER_FACTOR = 1_000_000

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

  public calculateVolumeInCubicMeter (): number {
    const volumeInCubicCm = this.heightInCm * this.widthInCm * this.depthInCm
    return volumeInCubicCm / this.CONVERT_TO_CUBIC_METER_FACTOR
  }
}
