import type { CustomUser } from './custom.user.interface'

export enum SpecialRequestStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export interface SpecialRequest {
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
}
