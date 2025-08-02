export enum Role {
  USER = 'USER', // regular user --> docent
  MANAGER = 'MANAGER', // building manager | concierge?
  ADMIN = 'ADMIN', //facility manager
}

export interface CustomUser {
  id?: string
  uid: string
  //   locale?: string  --> disabled for now
  role: Role
  name?: string
  createdAt?: string
  updatedAt?: string
}
