import React from 'react'
import FormDialog from '../forms/FormDialog'
import TextInput from '../forms/TextInput'
import SelectInput from '../forms/SelectInput'
import SubmitButton from '../forms/SubmitButton'

interface CreateCategoryFormProps {
  isOpen: boolean
  onClose: () => void
  title: string
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  categoryInput: { name: string, color: string }
  handleSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  error: Record<string, boolean>
}

const pastelColors = [
  { id: '#B5EAD7', name: 'Mint green' },
  { id: '#F7C6C7', name: 'Rose quartz' },
  { id: '#AEC6CF', name: 'Powder blue' },
  { id: '#CBAACB', name: 'Lavender grey' },
  { id: '#FFF5BA', name: 'Pale yellow' },
  { id: '#FFD1BA', name: 'Peach cream' },
  { id: '#E0F2F1', name: 'Aqua mist' },
  { id: '#E3D4FF', name: 'Cotton lilac' },
  { id: '#CED2FF', name: 'Lavender blue' },
  { id: '#FFF4E6', name: 'Peach blush' },
  { id: '#CFFFE5', name: 'Jade tint' },
  { id: '#D6F0FF', name: 'Arctic sky' },
  { id: '#F0D6E6', name: 'Petal pink' },
  { id: '#FFD6D6', name: 'Baby pink' },
  { id: '#D4F1F9', name: 'Crystal blue' },
  { id: '#F9D5E5', name: 'Chalk rose' },
  { id: '#FFD3B6', name: 'Pale peach' },
  { id: '#DBF6E9', name: 'Mint water' },
  { id: '#E9DFFB', name: 'Soft violet' },
  { id: '#D0EFFF', name: 'Pastel sky' }
];


const CreateCategoryForm: React.FC<CreateCategoryFormProps> = ({
  isOpen,
  onClose,
  title,
  onSubmit,
  handleChange,
  handleSelectChange,
  categoryInput,
  error
}) => {
  return (
    <FormDialog
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      onSubmit={onSubmit}
    >
      <TextInput
        label='Name'
        placeholder='Enter your category name'
        onChange={handleChange}
        type='text'
        name='name'
        value={categoryInput.name}
        required
      />
      {error.name && <p className='text-red-500 text-xs -mt-3'>Name is required</p>}
      <SelectInput
        label='Color'
        onChange={handleSelectChange}
        name='color'
        value={categoryInput.color}
        options={pastelColors}
        required
      />
      {error.color && <p className='text-red-500 text-xs -mt-3'>Color is required</p>}
      <SubmitButton
        text='Create category'
        isDisabled={error.name || error.color}
      />
    </FormDialog>
  )
}

export default CreateCategoryForm
