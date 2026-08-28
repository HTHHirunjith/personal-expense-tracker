import React from 'react'
import { CgProfile } from 'react-icons/cg'
import { Link } from 'react-router-dom'

interface TopbarProps {
  children: React.ReactNode
}

const Topbar: React.FC<TopbarProps> = ({ children }) => {
  return (
    <div className='flex-1 flex flex-col mb-4'>
      <header className='bg-white flex items-center justify-between px-6 py-4'>
        <h3 className='font-semibold text-sm'>Welcome back</h3>
        <Link to='/profile' className='ml-auto cursor-pointer'>
          <CgProfile size={30} />
        </Link>
      </header>

      <main className='flex-1 overflow-auto flex relative'>
        {children}
      </main>
    </div>
  )
}

export default Topbar
