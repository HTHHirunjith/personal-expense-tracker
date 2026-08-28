import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import TotalCardList from '../components/dashboard/TotalCardList'
import BarChartComponent from '../components/dashboard/BarChartComponent'
import { useTransactionStore } from '../stores/useTransactionStore'
import { useApiClient } from '../hooks/useApiClient'
import type { Transaction } from '../types/dashboard'
import { formatDate } from '../utils/formatDate'
import TransactionsTable from '../components/transactions/TransactionsTable'

const DashboardPage: React.FC = () => {
  const { transactions, getMonthlyTransactions } = useTransactionStore((state) => state)
  const { get } = useApiClient()
  const { firstDayOfMonth, currentDayAndTime } = formatDate(new Date())

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const monthlyTransactionsResponse = await get<Transaction[]>(
          `/transactions?startDate=${firstDayOfMonth}&endDate=${currentDayAndTime}`
        )

        if (monthlyTransactionsResponse.data) {
          getMonthlyTransactions(monthlyTransactionsResponse.data)
        }
      } catch (error) {
        console.error('Error al obtener transacciones mensuales:', error)
      }
    }

    getTransactions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Layout>
      <div className='flex flex-col p-4 w-4/5 mb-10'>
        <TotalCardList />
        <BarChartComponent transactions={transactions} />
        <TransactionsTable />
      </div>
    </Layout>
  )
}

export default DashboardPage
