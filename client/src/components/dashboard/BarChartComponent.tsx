import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  CartesianGrid,
} from 'recharts'
import type { Transaction } from '../../types/dashboard'

interface BarChartProps {
  transactions: Transaction[]
}

const BarChartComponent: React.FC<BarChartProps> = ({ transactions }) => {
  const data = Object.values(
    transactions
      .filter(t => t.type === 'EXPENSE')
      .reduce((acc, t) => {
        const key = t.category.name
        if (!acc[key]) {
          acc[key] = {
            name: key,
            total: 0,
            color: t.category.color
          }
        }
        acc[key].total += t.amount
        return acc
      }, {} as Record<string, { name: string; total: number; color: string }>)
  )

  return (
    <div className="w-full h-[400px] bg-white rounded-2xl shadow-md p-6 my-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Total expenses by category
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 20, bottom: 40, left: 0 }} maxBarSize={20} barGap={0}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="name" stroke="#475569" tick={{ fontSize: 12 }} />
          <YAxis stroke="#475569" tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{ backgroundColor: '#f9fafb', borderColor: '#cbd5e1' }}
            labelStyle={{ color: '#334155', fontWeight: 600 }}
            formatter={(value: number) => `$${value.toFixed(2)}`}
          />
          <Bar dataKey="total" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color || '#0ea5e9'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BarChartComponent
