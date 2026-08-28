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
    <div className='flex flex-col gap-2'>
      <label className='font-semibold text-xs'>{label}</label>
      <input
        className='border border-gray-300 rounded-md p-3 text-xs focus:outline-none'
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