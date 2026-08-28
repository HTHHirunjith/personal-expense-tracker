import React from 'react'
import { formatAmount } from '../../utils/formatAmount'

interface CardItemProps {
  title: string
  amount: number
}

const CardItem: React.FC<CardItemProps> = ({ title, amount }) => {
  return (
    <div className='flex border border-gray-300 rounded-md p-4 bg-white flex-1 shadow-md'>
      <div className='flex flex-col gap-6'>
        <h3 className='font-semibold text-sm'>{title}</h3>
        <p className='font-semibold text-3xl'>{formatAmount(amount, 'ARS')}</p>
      </div>
    </div>
  )
}

export default CardItem
