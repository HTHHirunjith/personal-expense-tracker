import React from 'react'

interface FormDialogProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode,
  title: string
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const FormDialog: React.FC<FormDialogProps> = ({ isOpen, onClose, children, title, onSubmit }) => {
  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4'>
      <div className='w-full max-w-md rounded-xl border border-slate-200 bg-white p-5 shadow-lg sm:p-6'>
        <div className='mb-4 flex items-start justify-between gap-4'>
          <div>
            <h2 className='text-xl font-semibold text-slate-800'>{title}</h2>
            <p className='mt-0.5 text-sm text-slate-500'>Fill in the details below</p>
          </div>
          <button
            onClick={onClose}
            aria-label='Close'
            className='flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 cursor-pointer'
          >
            ✕
          </button>
        </div>
        <form onSubmit={onSubmit} className='flex flex-col gap-4'>
          {children}
        </form>
      </div>
    </div>
  )
}

export default FormDialog
