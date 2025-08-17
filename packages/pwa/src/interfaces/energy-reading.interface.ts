import type { BuildingType } from './building.interface'
import type { CustomUser } from './custom.user.interface'

export enum MeterType {
  ELECTRICITY = 'ELECTRICITY',
  GAS = 'GAS',
  WATER = 'WATER',
}

export interface energyReadingType {
  readingId: string
  meterType: MeterType
  value: number
  recordedBy: CustomUser
  recordedById: string
  building: BuildingType
  buildingId: string
  recordedAt: Date
}
