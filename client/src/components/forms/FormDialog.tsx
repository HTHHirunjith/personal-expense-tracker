import React from 'react'

interface FormDialogProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode,
  title: string
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const FormDialog: React.FC<FormDialogProps> = ({ isOpen, onClose, children, title, onSubmit }) => {
  return (
    <>
      {isOpen &&
        <div className={`absolute w-screen h-screen bg-black/70 flex items-center justify-center ${isOpen ? 'visible' : 'hidden'}`}>
          <div className={`bg-white  flex flex-col gap-4 p-4 shadow-md rounded-xl ${isOpen ? 'w-1/3' : 'hidden'}`}>
            <button onClick={onClose} className='self-end'>✕</button>
            <h1 className='text-2xl font-semibold'>{title}</h1>
            <form onSubmit={onSubmit} className='flex flex-col gap-4'>
              {children}
            </form>
          </div>
        </div>
      }
    </>
  )
}

export default FormDialog
