type Role = 'user' | 'admin'

export interface User {
  _id: string
  roles: Role[]
  email: string
  createdAt: string
  updatedAt: string
  address?: string
  avatar?: string
  date_of_birth?: string // ISO 8601 date
  name?: string
  phone?: string
}
