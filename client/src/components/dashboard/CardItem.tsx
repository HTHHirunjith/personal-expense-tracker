import React from 'react'
import { formatAmount } from '../../utils/formatAmount'

interface CardItemProps {
  title: string
  amount: number
  icon: React.ReactNode
  accentClass: string
}

const CardItem: React.FC<CardItemProps> = ({ title, amount, icon, accentClass }) => {
  return (
    <div className='flex flex-1 flex-col justify-between gap-4 bg-white rounded-xl border border-slate-200 shadow-sm p-5'>
      <div className='flex items-center justify-between'>
        <h3 className='text-sm font-medium text-slate-500'>{title}</h3>
        <div className={`flex items-center justify-center h-9 w-9 rounded-lg ${accentClass}`}>
          {icon}
        </div>
      </div>
      <p className='font-semibold text-2xl text-slate-800'>{formatAmount(amount, 'USD')}</p>
    </div>
  )
}

export default CardItem
