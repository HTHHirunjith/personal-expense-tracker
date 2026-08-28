import React, { useEffect } from 'react'
import GeneralBalanceCard from './GeneralBalanceCard'
import Button from '../ui/Button'
import { MdAdd } from 'react-icons/md'
import { useTransactionStore } from '../../stores/useTransactionStore'
import { useGeneralStore } from '../../stores/useGeneralStore'

const Rightbar: React.FC = () => {
  const { transactions } = useTransactionStore((state) => state)
  const { openCreateTransactionModal } = useGeneralStore((state) => state)

  useEffect(() => {}, [transactions.length])

  return (
    <aside className='flex flex-col bg-white border-l border-slate-200 w-72 ml-4 rounded-b-md p-4 flex-shrink-0'>
      <div className='flex flex-col gap-4'>
        <GeneralBalanceCard totalTransactions={transactions.length} />
        <Button
          label='Add Transaction'
          icon={<MdAdd size={18} />}
          onClick={openCreateTransactionModal}
        />
      </div>
    </aside>
  )
}

export default Rightbar
