import React from 'react'

interface Option {
  id: string
  name: string
  color?: string
}

interface SelectInputProps {
  label: string
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  name: string
  value: string | number | readonly string[] | undefined
  options: Option[]
  required: boolean
}

const SelectInput: React.FC<SelectInputProps> = ({ onChange, name, value, options, label, required }) => {
  return (
    <div className='flex flex-col gap-1.5'>
      <label className='text-sm font-medium text-slate-700'>{label}</label>
      <select
        className='w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 transition-colors focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20'
        onChange={onChange}
        name={name}
        value={value}
        required={required}
      >
        <option value="">Select an option</option>
        {options.map((option) => {
          return (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default SelectInput
