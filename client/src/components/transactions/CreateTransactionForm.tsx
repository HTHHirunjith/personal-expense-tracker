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
      <div className='flex flex-col gap-1.5'>
        <TextInput
          label='Title'
          placeholder='Enter a title'
          onChange={handleChange}
          type='text'
          name='title'
          value={transactionInput.title}
          required
        />
        {error.title && <p className='text-xs text-red-500'>Title is required</p>}
      </div>
      <div className='flex flex-col gap-1.5'>
        <TextInput
          label='Amount'
          placeholder='Enter the transaction amount'
          onChange={handleChange}
          type='number'
          name='amount'
          value={transactionInput.amount}
          required
          min='0.01'
          step='any'
        />
        {error.amount && <p className='text-xs text-red-500'>Amount must be greater than zero</p>}
      </div>
      <div className='flex flex-col gap-1.5'>
        <SelectInput
          label='Type'
          onChange={handleSelectChange}
          name='type'
          value={transactionInput.type}
          options={[{ id: 'EXPENSE', name: 'EXPENSE' }, { id: 'INCOME', name: 'INCOME' }]}
          required
        />
        {error.type && <p className='text-xs text-red-500'>Type is required</p>}
      </div>
      <div className='flex flex-col gap-1.5'>
        <TextInput
          label='Description'
          placeholder='Enter the transaction description'
          onChange={handleChange}
          type='text'
          name='description'
          value={transactionInput.description}
          required
        />
        {error.description && <p className='text-xs text-red-500'>Description is required</p>}
      </div>
      <div className='flex flex-col gap-1.5'>
        <SelectInput
          label='Category'
          onChange={handleSelectChange}
          name='categoryId'
          value={transactionInput.categoryId}
          options={categories}
          required
        />
        {error.categoryId && <p className='text-xs text-red-500'>Category is required</p>}
      </div>
      <div className='mt-1 flex items-center gap-3'>
        <div className='flex-1'>
          <SubmitButton
            text='Create transaction'
            isDisabled={error.title || error.amount || error.type || error.description || error.categoryId}
          />
        </div>
        <div className='flex-1'>
          <button
            className='w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 cursor-pointer'
            onClick={openCategoryModal}
          >
            Add Category
          </button>
        </div>
      </div>
    </FormDialog>
  )
}

export default CreateTransactionForm
