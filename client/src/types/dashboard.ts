export interface Category {
  id: string
  name: string
  color: string
  isDefault: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Transaction {
  id: string
  title: string
  amount: number
  description: string
  category: Category
  type: string
  createdAt: Date
  updatedAt: Date
}

export interface Report {
  month: string
  totalIncome: number
  totalExpense: number
  balance: number
}
