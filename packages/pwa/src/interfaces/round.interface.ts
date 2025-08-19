export interface Round {
  roundId: string
  name: string
  status: RoundStatus
  assignedTo: {
    id: string
    uid: string
    name: string
    role: string
  }
  rooms: RoundRoom[]
  buildingId: string
}

export interface RoundRoom {
  roomId: string
  roundRoomId: string
  order: number
  status: RoundRoomStatus
  checklist?: ChecklistItem[] // Optional checklist for each room
}

export interface ChecklistItem {
  itemId: string
  label: string
  notes?: string // Optional notes for the checklist item
  status: ChecklistItemStatus
}

export enum RoundStatus {
  PLANNED = 'planned',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}
export enum ChecklistItemStatus {
  NOT_CHECKED = 'NOT_CHECKED',
  OK = 'OK',
  PROBLEM = 'PROBLEM',
}

export enum RoundRoomStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}
