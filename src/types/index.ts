export interface User {
  name: string
  email: string
  password: string
}

export interface Transaction {
  id: string
  type: 'credit' | 'debit'
  description: string
  amount: number
  date: string
}