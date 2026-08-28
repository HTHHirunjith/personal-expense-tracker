import React from 'react'

interface TextInputProps {
  label: string
  placeholder: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  type: string
  name: string
  value: string | number | readonly string[] | undefined
  required?: boolean
}

const TextInput: React.FC<TextInputProps> = ({ label, placeholder, onChange, type, name, value, required }) => {
  return (
    <div className='flex flex-col gap-1.5'>
      <label className='text-sm font-medium text-slate-700'>{label}</label>
      <input
        className='w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 transition-colors focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20'
        placeholder={placeholder}
        onChange={onChange}
        type={type}
        name={name}
        value={value}
        required={required}
      />
    </div>
  )
}

export default TextInput
