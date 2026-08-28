import React, { useEffect, useState } from 'react'
import Topbar from './layout/Topbar'
import Leftbar from './layout/Leftbar'
import Rightbar from './layout/Rightbar'
import { useCategoryStore } from '../stores/useCategoryStore'
import { useGeneralStore } from '../stores/useGeneralStore'
import { useApiClient } from '../hooks/useApiClient'
import type { Category, Transaction } from '../types/dashboard'
import { useTransactionStore } from '../stores/useTransactionStore'
import CreateTransactionForm from './transactions/CreateTransactionForm'
import CreateCategoryForm from './categories/CreateCategoryForm'
import EditTransactionForm from './transactions/EditTransactionForm'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { categories, getAllCategories } = useCategoryStore((state) => state)
  const [error, setError] = useState({
    title: false,
    amount: false,
    type: false,
    description: false,
    categoryId: false
  })
  const [categoryError, setCategoryError] = useState({
    name: false,
    color: false
  })
  const { setTransaction, editingTransaction, updateTransaction } = useTransactionStore((state) => state)
  const { isTransactionFormOpen, closeCreateTransactionModal, isCategoryFormOpen, closeCreateCategoryModal, openCreateCategoryModal, isEditTransactionFormOpen, closeEditTransactionModal } = useGeneralStore((state) => state)
  const { get, post, put } = useApiClient()
  const [transactionInput, setTransactionInput] = useState({
    title: '',
    amount: 0,
    type: '',
    description: '',
    categoryId: ''
  })
  const [editFeedback, setEditFeedback] = useState<{ message: string, type: 'success' | 'error' } | null>(null)
  const [categoryInput, setCategoryInput] = useState({
    name: '',
    color: '',
    isDefault: true
  })

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await get<Category[]>('/categories')
        if (response.data) {
          getAllCategories(response.data)
        }
      } catch (error) {
        console.log(error)
      }
    }

    getCategories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isEditTransactionFormOpen && editingTransaction) {
      setTransactionInput({
        title: editingTransaction.title,
        amount: editingTransaction.amount,
        type: editingTransaction.type,
        description: editingTransaction.description,
        categoryId: editingTransaction.category.id
      })
      setEditFeedback(null)
      setError({
        title: false,
        amount: false,
        type: false,
        description: false,
        categoryId: false
      })
    }
  }, [isEditTransactionFormOpen, editingTransaction])

  const handleTransactionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTransactionInput({
      ...transactionInput,
      [event.target.name]: event.target.value
    })

    if (event.target.value === '') {
      setError({
        ...error,
        [event.target.name]: true
      })
    } else {
      setError({
        ...error,
        [event.target.name]: false
      })
    }
  }

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryInput({
      ...categoryInput,
      [event.target.name]: event.target.value
    })

    if (event.target.value === '') {
      setCategoryError({
        ...categoryError,
        [event.target.name]: true
      })
    } else {
      setCategoryError({
        ...categoryError,
        [event.target.name]: false
      })
    }
  }

  const handleSelectTransactionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTransactionInput({
      ...transactionInput,
      [event.target.name]: event.target.value
    })
  }

  const handleSelectCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryInput({
      ...categoryInput,
      [event.target.name]: event.target.value
    })
  }

  const handleTransactionSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const response = await post<Transaction>('/transactions', transactionInput)
      if (response.data) {
        setTransaction(response.data)
        setTransactionInput({ title: '', amount: 0, type: 'EXPENSE', description: '', categoryId: '' })
        closeCreateTransactionModal()
      } else {
        console.log(response.error)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleEditTransactionSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!editingTransaction) return

    try {
      const response = await put<Transaction>(`/transactions/${editingTransaction.id}`, transactionInput)
      if (response.data) {
        updateTransaction(response.data)
        setEditFeedback({ message: 'Transaction updated successfully', type: 'success' })
        closeEditTransactionModal()
      } else {
        setEditFeedback({ message: response.error || 'Failed to update transaction', type: 'error' })
      }
    } catch (error) {
      console.log(error)
      setEditFeedback({ message: 'An unexpected error occurred', type: 'error' })
    }
  }

  const handleCloseEditModal = () => {
    closeEditTransactionModal()
    setEditFeedback(null)
  }

  const handleCategorySubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const response = await post<Category>('/categories', categoryInput)
      if (response.data) {
        getAllCategories([...categories, response.data])
        setCategoryInput({ name: '', color: '', isDefault: true })
        closeCreateCategoryModal()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='relative flex h-screen bg-gray-100 overflow-auto z-10'>
      <Leftbar />

      <Topbar>
        {children}

        <Rightbar />
      </Topbar>

      {/* form create transaction dialog */}
      <CreateTransactionForm
        isOpen={isTransactionFormOpen}
        onClose={closeCreateTransactionModal}
        title='Create Transaction'
        onSubmit={handleTransactionSubmit}
        handleChange={handleTransactionChange}
        handleSelectChange={handleSelectTransactionChange}
        transactionInput={transactionInput}
        error={error}
        categories={categories}
        openCategoryModal={openCreateCategoryModal}
      />
      <CreateCategoryForm
        isOpen={isCategoryFormOpen}
        onClose={closeCreateCategoryModal}
        title='Create Category'
        onSubmit={handleCategorySubmit}
        handleChange={handleCategoryChange}
        handleSelectChange={handleSelectCategoryChange}
        categoryInput={categoryInput}
        error={categoryError}
      />
      <EditTransactionForm
        isOpen={isEditTransactionFormOpen}
        onClose={handleCloseEditModal}
        title='Edit Transaction'
        onSubmit={handleEditTransactionSubmit}
        handleChange={handleTransactionChange}
        handleSelectChange={handleSelectTransactionChange}
        transactionInput={transactionInput}
        error={error}
        categories={categories}
        feedback={editFeedback?.message ?? null}
        feedbackType={editFeedback?.type}
      />
    </div>
  )
}

export default Layout
