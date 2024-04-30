import { ReactNode } from 'react'

export interface PriceHighlightProps {
  variant: 'income' | 'outcome'
}

export interface TransactionTypeButtonPropsInterface {
  variant: 'income' | 'outcome'
}

export interface TransactionInterface {
  id: number
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
  createdAt: string
}

export interface TransactionsProviderInterface {
  children: ReactNode
}

export interface createTransactionInputInterface {
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
}

export interface TransactionsContextInterface {
  transactions: TransactionInterface[]
  getTransactions: (query?: string) => Promise<void>
  createTransaction: (data: createTransactionInputInterface) => Promise<void>
}
