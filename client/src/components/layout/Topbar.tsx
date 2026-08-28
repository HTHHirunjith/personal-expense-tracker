import React from 'react'
import { CgProfile } from 'react-icons/cg'
import { Link } from 'react-router-dom'

interface TopbarProps {
  children: React.ReactNode
}

const Topbar: React.FC<TopbarProps> = ({ children }) => {
  return (
    <div className='flex-1 flex flex-col min-w-0'>
      <header className='bg-white border-b border-slate-200 flex items-center justify-between px-6 py-4'>
        <div className='flex flex-col'>
          <h3 className='text-xl font-semibold text-slate-800'>Welcome back</h3>
          <p className='text-sm text-slate-500'>Here's an overview of your finances.</p>
        </div>
        <Link
          to='/profile'
          className='flex items-center justify-center h-10 w-10 rounded-full text-slate-600 transition-colors duration-200 hover:bg-slate-100 cursor-pointer'
          aria-label='Profile'
        >
          <CgProfile size={26} />
        </Link>
      </header>

      <main className='flex-1 overflow-auto flex relative'>
        {children}
      </main>
    </div>
  )
}

export default Topbar
