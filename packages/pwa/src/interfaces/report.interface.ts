import type { BuildingType } from './building.interface'
import type { CustomUser } from './custom.user.interface'

export interface ReportType {
  building?: BuildingType
  buildingId: string
  reportId: string
  title: string
  description: string
  reportedById: string
  reportedBy: CustomUser
  reportedAt: Date
  status: ReportStatus
}

export enum ReportStatus {
  NEW = 'NEW',
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
}
