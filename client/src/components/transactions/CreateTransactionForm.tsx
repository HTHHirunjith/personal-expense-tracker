import React from 'react'
import FormDialog from '../forms/FormDialog'
import TextInput from '../forms/TextInput'
import type { Category } from '../../types/dashboard'
import SelectInput from '../forms/SelectInput'
import SubmitButton from '../forms/SubmitButton'

interface CreateTransactionFormProps {
  isOpen: boolean
  onClose: () => void
  title: string
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  transactionInput: { title: string, amount: number, type: string, description: string, categoryId: string }
  handleSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  error: Record<string, boolean>
  openCategoryModal: () => void
  categories: Category[]
}

const CreateTransactionForm: React.FC<CreateTransactionFormProps> = ({
  isOpen,
  onClose,
  title,
  onSubmit,
  handleChange,
  handleSelectChange,
  transactionInput,
  error,
  categories,
  openCategoryModal
}) => {
  return (
    <FormDialog isOpen={isOpen} onClose={onClose} title={title} onSubmit={onSubmit}>
      <TextInput
        label='Title'
        placeholder='Enter a title'
        onChange={handleChange}
        type='text'
        name='title'
        value={transactionInput.title}
        required
      />
      {error.title && <p className='text-red-500 text-xs -mt-3'>Title is required</p>}
      <TextInput
        label='Amount'
        placeholder='Enter the transaction amount'
        onChange={handleChange}
        type='number'
        name='amount'
        value={transactionInput.amount}
        required
      />
      {error.amount && <p className='text-red-500 text-xs -mt-3'>Amount is required</p>}
      <SelectInput
        label='Type'
        onChange={handleSelectChange}
        name='type'
        value={transactionInput.type}
        options={[{ id: 'EXPENSE', name: 'EXPENSE' }, { id: 'INCOME', name: 'INCOME' }]}
        required
      />
      {error.type && <p className='text-red-500 text-xs -mt-3'>Type is required</p>}
      <TextInput
        label='Description'
        placeholder='Enter the transaction description'
        onChange={handleChange}
        type='text'
        name='description'
        value={transactionInput.description}
        required
      />
      {error.description && <p className='text-red-500 text-xs -mt-3'>Description is required</p>}
      <SelectInput
        label='Category'
        onChange={handleSelectChange}
        name='categoryId'
        value={transactionInput.categoryId}
        options={categories}
        required
      />
      {error.categoryId && <p className='text-red-500 text-xs -mt-3'>Category is required</p>}
      <div className='flex items-center w-full gap-2'>
        <SubmitButton
          text='Create transaction'
          isDisabled={error.title || error.amount || error.type || error.description || error.categoryId}
        />
        <button
          className='flex-1 bg-yellow-300 hover:bg-yellow-900 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-300 ease-in-out'
          onClick={openCategoryModal}
        >
          Add Category
        </button>
      </div>
    </FormDialog>
  )
}

export default CreateTransactionForm
