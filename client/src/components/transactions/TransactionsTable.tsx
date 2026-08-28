import React, { useEffect, useState } from 'react'
import type { Transaction } from '../../types/dashboard'
import { formatAmount } from '../../utils/formatAmount'
import { formatDate } from '../../utils/formatDate'
import { useApiClient } from '../../hooks/useApiClient'
import { useTransactionStore } from '../../stores/useTransactionStore'
import { useGeneralStore } from '../../stores/useGeneralStore'

const TransactionsTable: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const { dailyTransactions, getDailyTransactions, editTransaction } = useTransactionStore((state) => state)
  const { openEditTransactionModal } = useGeneralStore((state) => state)
  const { get, del } = useApiClient()
  const { subDays, addDays } = formatDate(currentDate)

  const goToPreviousDay = () => setCurrentDate(prev => subDays(prev, 1))
  const goToNextDay = () => setCurrentDate(prev => addDays(prev, 1))

  const handleEdit = (transaction: Transaction) => {
    editTransaction(transaction)
    openEditTransactionModal()
  }

  const deleteTransaction = async (id: string) => {
    try {
      await del(`/transactions/${id}`)
      window.location.reload()
    } catch(error) {
      console.error('Error al eliminar transacción:', error)
    }
  }

  useEffect(() => {
    const fetchDailyTransactions = async (date: Date) => {
      const { currentStartOfDay, currentEndOfDay } = formatDate(date)

      try {
        const response = await get<Transaction[]>(
          `/transactions?startDate=${currentStartOfDay}&endDate=${currentEndOfDay}`
        )
        if (response.data) getDailyTransactions(response.data)
      } catch (error) {
        console.error('Error al obtener transacciones:', error)
      }
    }

    fetchDailyTransactions(currentDate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDate])

  return (
    <div className='w-full bg-white rounded-xl border border-slate-200 shadow-sm p-5'>
      <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h2 className='text-lg font-semibold text-slate-800'>Transactions</h2>
          <p className='text-sm text-slate-500'>Transactions for the selected day.</p>
        </div>
        <div className='flex items-center gap-1'>
          <button
            onClick={goToPreviousDay}
            className='flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50 cursor-pointer'
          >
            ◁
          </button>
          <span className='whitespace-nowrap px-2 text-sm font-medium text-slate-700'>
            {currentDate.toLocaleDateString()}
          </span>
          <button
            onClick={goToNextDay}
            className='flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50 cursor-pointer'
          >
            ▷
          </button>
        </div>
      </div>

      <div className='mt-5 overflow-x-auto'>
        <table className='w-full text-left'>
          <thead>
            <tr className='border-b border-slate-200 bg-slate-50'>
              <th className='px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide'>Title</th>
              <th className='px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide'>Amount</th>
              <th className='px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide'>Category</th>
              <th className='px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide'>Type</th>
              <th className='px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide'>Date</th>
              <th className='px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dailyTransactions.length === 0 ? (
              <tr>
                <td colSpan={6} className='px-4 py-16 text-center'>
                  <div className='text-sm font-medium text-slate-500'>No transactions for this day</div>
                  <div className='mt-1 text-sm text-slate-400'>
                    Add a transaction or pick another date to see activity.
                  </div>
                </td>
              </tr>
            ) : (
              dailyTransactions
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map((transaction) => (
                  <tr
                    key={transaction.id}
                    className='border-b border-slate-100 transition-colors duration-150 hover:bg-slate-50'
                  >
                    <td className='px-4 py-3 text-sm font-medium text-slate-800'>{transaction.title}</td>
                    <td className='whitespace-nowrap px-4 py-3 text-sm font-medium text-slate-800'>
                      {formatAmount(transaction.amount, 'USD')}
                    </td>
                    <td className='px-4 py-3 text-sm text-slate-600'>
                      <div className='flex items-center gap-2'>
                        <span
                          className='inline-block h-2.5 w-2.5 rounded-full'
                          style={{ backgroundColor: transaction.category.color }}
                        ></span>
                        {transaction.category.name}
                      </div>
                    </td>
                    <td className='px-4 py-3'>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          transaction.type === 'EXPENSE'
                            ? 'bg-red-50 text-red-600'
                            : 'bg-emerald-50 text-emerald-600'
                        } capitalize`}
                      >
                        {transaction.type.toLowerCase()}
                      </span>
                    </td>
                    <td className='whitespace-nowrap px-4 py-3 text-sm text-slate-600'>
                      {formatDate(new Date(transaction.createdAt)).beautifyDate}
                    </td>
                    <td className='px-4 py-3'>
                      <div className='flex items-center gap-2'>
                        <button
                          onClick={() => handleEdit(transaction)}
                          className='rounded-md bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-amber-600 cursor-pointer'
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteTransaction(transaction.id)}
                          className='rounded-md bg-red-500 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-red-600 cursor-pointer'
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TransactionsTable
