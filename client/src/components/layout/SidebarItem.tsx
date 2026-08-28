import React from 'react'
import { Link, useLocation } from 'react-router-dom'

interface SidebarItemProps {
  icon: React.ReactNode
  label: string
  route: string
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, route }) => {
  const { pathname } = useLocation()
  const isActive = route === '/' ? pathname === '/' : pathname.startsWith(route)

  return (
    <Link
      to={route}
      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200 cursor-pointer ${
        isActive
          ? 'bg-blue-50 text-blue-700'
          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
      }`}
    >
      <span className={isActive ? 'text-blue-600' : 'text-slate-400'}>{icon}</span>
      <span>{label}</span>
    </Link>
  )
}

export default SidebarItem
