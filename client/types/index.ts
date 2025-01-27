export interface Article {
  id: number
  title: string
  body: string
  user: User
  createdAt: Date
}

export interface User {
  id: number
  email: string
  name: string
}