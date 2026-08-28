import React, { useEffect } from 'react'
import CardItem from './CardItem'
import { MdTrendingDown, MdTrendingUp, MdAccountBalanceWallet } from 'react-icons/md'
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
    <div className='flex items-stretch gap-4 w-full'>
      <CardItem
        title='Monthly Expenses'
        amount={monthlyExpense}
        icon={<MdTrendingDown size={20} />}
        accentClass='bg-rose-50 text-rose-500'
      />
      <CardItem
        title='Monthly Income'
        amount={monthlyIncome}
        icon={<MdTrendingUp size={20} />}
        accentClass='bg-emerald-50 text-emerald-600'
      />
      <CardItem
        title='Total Balance'
        amount={balance}
        icon={<MdAccountBalanceWallet size={20} />}
        accentClass='bg-blue-50 text-blue-600'
      />
    </div>
  )
}

export default TotalCardList
