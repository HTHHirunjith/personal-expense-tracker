import React from 'react'

interface GeneralBalanceCardProps {
  totalTransactions: number
}

const GeneralBalanceCard: React.FC<GeneralBalanceCardProps> = ({ totalTransactions }) => {
  return (
    <div className='w-full h-1/5 border border-gray-300 rounded-md mb-2 flex flex-col gap-2 px-4 py-6 shadow-md'>
      <h3 className='font-semibold text-sm'>Total Transactions</h3>
      <p className='font-semibold text-3xl'>{totalTransactions}</p>
    </div>
  )
}

export default GeneralBalanceCard
