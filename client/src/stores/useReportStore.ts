import { create } from 'zustand'
import type { Report } from '../types/dashboard'

interface ReportState {
  monthlyIncome: number
  monthlyExpense: number
  balance: number
  getMonthlyReport: (report: Report) => void
}

export const useReportStore = create<ReportState>((set) => ({
  monthlyIncome: 0,
  monthlyExpense: 0,
  balance: 0,
  getMonthlyReport: (report: Report) => set({
    monthlyIncome: report.totalIncome,
    monthlyExpense: report.totalExpense,
    balance: report.balance
  }),
}))
