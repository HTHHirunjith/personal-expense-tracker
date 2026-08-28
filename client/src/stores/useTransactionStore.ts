import { create } from 'zustand'
import type { Transaction } from '../types/dashboard'

type TransactionState = {
  transactions: Transaction[],
  dailyTransactions: Transaction[],
  editingTransaction: Transaction | null,
  getMonthlyTransactions: (transactions: Transaction[]) => void,
  getDailyTransactions: (transactions: Transaction[]) => void
  setTransaction: (transaction: Transaction) => void,
  editTransaction: (transaction: Transaction) => void,
  updateTransaction: (transaction: Transaction) => void
}

const upsertTransaction = (list: Transaction[], transaction: Transaction): Transaction[] =>
  list.map(item => item.id === transaction.id ? transaction : item)

export const useTransactionStore = create<TransactionState>((set) => ({
  transactions: [],
  dailyTransactions: [],
  editingTransaction: null,
  getMonthlyTransactions: (transactions: Transaction[]) => set({ transactions }),
  getDailyTransactions: (transactions: Transaction[]) => set({ dailyTransactions: transactions }),
  setTransaction: (transaction: Transaction) => set((state) => ({ 
    transactions: [...state.transactions, transaction],
    dailyTransactions: [...state.dailyTransactions, transaction] 
  })),
  editTransaction: (transaction: Transaction) => set({ editingTransaction: transaction }),
  updateTransaction: (transaction: Transaction) => set((state) => ({
    transactions: upsertTransaction(state.transactions, transaction),
    dailyTransactions: upsertTransaction(state.dailyTransactions, transaction)
  }))
}))
