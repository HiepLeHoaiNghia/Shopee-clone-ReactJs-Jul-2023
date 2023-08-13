type Role = 'user' | 'admin'

export interface User {
  _id: string
  roles: Role[]
  email: string
  name?: string
  date_of_birth?: string // ISO 8601 date
  avatar?: string
  address?: string
  phone?: string
  createdAt: string
  updatedAt: string
}
