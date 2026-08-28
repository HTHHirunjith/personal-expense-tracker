import React from 'react'
import SidebarItem from './SidebarItem'
import { MdDashboard, MdAccountBalanceWallet } from 'react-icons/md'
import { FaSignOutAlt } from 'react-icons/fa'
import { useAuthStore } from '../../stores/useAuthStore'
import { useNavigate } from 'react-router-dom'

const Leftbar: React.FC = () => {
  const { logout } = useAuthStore(state => state)
  const navigate = useNavigate()

  const logoutHandler = () => {
    logout()
    navigate('/login')
  }

  return (
    <aside className='bg-white flex flex-col w-64 border-r border-slate-200 flex-shrink-0'>
      <div className='flex items-center gap-3 px-5 h-16 border-b border-slate-100'>
        <div className='flex items-center justify-center h-9 w-9 rounded-lg bg-blue-600 text-white flex-shrink-0'>
          <MdAccountBalanceWallet size={20} />
        </div>
        <div className='flex flex-col leading-tight overflow-hidden'>
          <span className='text-blue-600 font-bold text-base whitespace-nowrap'>Expense Tracker</span>
          <span className='text-xs text-slate-400'>Personal finance</span>
        </div>
      </div>

      <nav className='flex flex-col gap-1 px-3 py-4 flex-1'>
        <span className='px-3 pb-2 text-xs font-medium text-slate-400 uppercase tracking-wide'>Menu</span>
        <SidebarItem icon={<MdDashboard size={20} />} label='Dashboard' route='/' />
      </nav>

      <div className='px-3 py-4 border-t border-slate-100'>
        <button
          onClick={logoutHandler}
          className='w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors duration-200 hover:bg-red-50 hover:text-red-600 cursor-pointer'
        >
          <FaSignOutAlt size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}

export default Leftbar
