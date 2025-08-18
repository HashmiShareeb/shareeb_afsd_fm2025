import type { BuildingType } from './building.interface'
import type { CustomUser } from './custom.user.interface'

export enum SpecialRequestStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export interface SpecialRequestType {
  requestId: string
  title: string
  description: string
  status: SpecialRequestStatus
  requestedBy: CustomUser
  requestedById: string
  requestedAt: Date
  updatedAt: Date
  roomId: string
  buildingId: string
  building: BuildingType
}
