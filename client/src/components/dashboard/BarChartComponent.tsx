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
import { MdPieChart } from 'react-icons/md'
import type { Transaction } from '../../types/dashboard'
import { formatAmount } from '../../utils/formatAmount'

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
    <div className="w-full bg-white rounded-xl border border-slate-200 shadow-sm p-5">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-800">Total expenses by category</h2>
        <p className="text-sm text-slate-500">Breakdown of your spending this month</p>
      </div>

      {data.length === 0 ? (
        <div className="flex h-72 flex-col items-center justify-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
            <MdPieChart size={24} />
          </div>
          <p className="mt-4 text-sm font-medium text-slate-600">No expense data yet</p>
          <p className="mt-1 text-sm text-slate-400">
            Your category breakdown will appear here once you add expenses.
          </p>
        </div>
      ) : (
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: 0 }} maxBarSize={32} barGap={8}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis
                dataKey="name"
                stroke="#94a3b8"
                tick={{ fontSize: 12, fill: '#64748b' }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={false}
              />
              <YAxis
                stroke="#94a3b8"
                tick={{ fontSize: 12, fill: '#64748b' }}
                axisLine={false}
                tickLine={false}
                width={72}
              />
              <Tooltip
                cursor={{ fill: 'rgba(148, 163, 184, 0.12)' }}
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: 8,
                  boxShadow: '0 1px 2px rgba(15, 23, 42, 0.06)'
                }}
                labelStyle={{ color: '#334155', fontWeight: 600, marginBottom: 4 }}
                formatter={(value: number) => formatAmount(value, 'USD')}
              />
              <Bar dataKey="total" radius={[6, 6, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color || '#3b82f6'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}

export default BarChartComponent
