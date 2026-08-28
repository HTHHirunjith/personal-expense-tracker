import React from 'react'
import SidebarItem from './SidebarItem'
import { MdDashboard } from 'react-icons/md'
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
    <aside className={'bg-white p-4 flex flex-col gap-6 transition-all duration-300 w-60'}>
      <div className='text-blue-600 font-bold text-xl transition-all duration-300 overflow-hidden whitespace-nowrap'>
        Expense Tracker
      </div>
      <SidebarItem icon={<MdDashboard size={20} />} label='Dashboard' route='/' />

      <span className='mt-auto text-red-500'>
        <button
          className='text-gray-700 transition-all duration-300 hover:text-red-600 cursor-pointer flex items-center gap-2'
          onClick={logoutHandler}
        >
          <FaSignOutAlt size={20} />
          Logout
        </button>
      </span>
    </aside>
  )
}

export default Leftbar
