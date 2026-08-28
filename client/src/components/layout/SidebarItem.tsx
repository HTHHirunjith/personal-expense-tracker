import React from 'react'
import { Link } from 'react-router-dom'

interface SidebarItemProps {
  icon: React.ReactNode
  label: string
  route: string
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, route }) => {
  return (
    <Link to={route} className='flex items-center gap-3 transition-all duration-300 text-gray-700 hover:text-blue-600 cursor-pointer'>
      {icon}
      <span>{label}</span>
    </Link>
  )
}

export default SidebarItem
