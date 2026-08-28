import React from 'react'

interface ButtonProps {
  label: string
  icon?: React.ReactNode
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({ label, icon, onClick }) => {
  return (
    <button
      className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200 focus:outline-none cursor-pointer"
      onClick={onClick}
    >
      {icon}
      {label}
    </button>
  )
}

export default Button
