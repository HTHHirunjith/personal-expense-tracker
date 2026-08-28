import React from 'react'

interface Option {
  id: string
  name: string
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
    <>
      <label className='font-semibold text-xs -mb-2'>{label}</label>
      <select
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
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
    </>
  )
}

export default SelectInput
