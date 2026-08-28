import React, { useEffect } from 'react'
import CardItem from './CardItem'
import { useReportStore } from '../../stores/useReportStore'
import { useApiClient } from '../../hooks/useApiClient'
import { formatDate } from '../../utils/formatDate'
import type { Report } from '../../types/dashboard'
import { useTransactionStore } from '../../stores/useTransactionStore'

const TotalCardList: React.FC = () => {
  const { monthlyIncome, monthlyExpense, balance, getMonthlyReport } = useReportStore(state => state)
  const { transactions } = useTransactionStore(state => state)
  const { get } = useApiClient()

  useEffect(() => {
    const getReport = async () => {
      try {
        const response = await get<Report>(`/reports/monthly?month=${formatDate(new Date()).currentMonth}`)
        if(response.data) {
          getMonthlyReport(response.data)
        }
      } catch (error) {
        console.log(error)
      }
    }

    getReport()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactions])

  return (
    <div className='flex items-center gap-4 w-full'>
      <CardItem title='Monthly Expenses' amount={monthlyExpense} />
      <CardItem title='Monthly Income' amount={monthlyIncome} />
      <CardItem title='Total Balance' amount={balance} />
    </div>
  )
}

export default TotalCardList
