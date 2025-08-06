export interface BuildingType {
  buildingId: string
  name: string
  address: string
  type: string
  description?: string
  createdAt?: Date
  updatedAt?: Date

  rooms?: Array<{
    roomId: string
    name: string
    floor: number
    capacity: number
  }>
}
