import React, { useEffect } from 'react'
import GeneralBalanceCard from './GeneralBalanceCard'
import Button from '../ui/Button'
import { useTransactionStore } from '../../stores/useTransactionStore'
import { useGeneralStore } from '../../stores/useGeneralStore'

const Rightbar: React.FC = () => {
  const { transactions } = useTransactionStore((state) => state)
  const { openCreateTransactionModal } = useGeneralStore((state) => state)

  useEffect(() => {}, [transactions.length])

  return (
    <aside className='flex flex-col bg-white p-4 w-72 ml-4 rounded-b-md'>
      <GeneralBalanceCard totalTransactions={transactions.length} />
      <Button
        label='Add Transaction'
        onClick={openCreateTransactionModal}
      />
    </aside>
  )
}

export default Rightbar
