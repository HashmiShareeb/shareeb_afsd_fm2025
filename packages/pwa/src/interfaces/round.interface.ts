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
  checklist?: ChecklistItem[] // Optional checklist for each room
}

export interface ChecklistItem {
  itemId: string
  label: string
  notes?: string // Optional notes for the checklist item
  status: ChecklistItemStatus
}

export enum RoundStatus {
  PLANNED = 'PLANNED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum ChecklistItemStatus {
  NOT_CHECKED = 'NOT_CHECKED',
  OK = 'OK',
  PROBLEM = 'PROBLEM',
}
