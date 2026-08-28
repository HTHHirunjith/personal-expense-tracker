import React from 'react'
import { MdReceiptLong } from 'react-icons/md'

interface GeneralBalanceCardProps {
  totalTransactions: number
}

const GeneralBalanceCard: React.FC<GeneralBalanceCardProps> = ({ totalTransactions }) => {
  return (
    <div className='w-full rounded-xl border border-slate-200 bg-white p-5 shadow-sm'>
      <div className='flex items-center justify-between mb-4'>
        <span className='text-sm font-medium text-slate-500'>Total Transactions</span>
        <div className='flex items-center justify-center h-9 w-9 rounded-lg bg-blue-50 text-blue-600'>
          <MdReceiptLong size={20} />
        </div>
      </div>
      <p className='font-semibold text-3xl text-slate-800'>{totalTransactions}</p>
      <p className='mt-1 text-xs text-slate-400'>All time</p>
    </div>
  )
}

export default GeneralBalanceCard
