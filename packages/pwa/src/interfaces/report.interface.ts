import type { CustomUser } from './custom.user.interface'

export interface ReportType {
  id: string
  title: string
  description: string
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
