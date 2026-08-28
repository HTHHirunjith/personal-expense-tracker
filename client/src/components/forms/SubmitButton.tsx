import React from 'react'

interface SubmitButtonProps {
  text: string
  isDisabled?: boolean
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ text, isDisabled }) => {
  return (
    <button
      type="submit"
      className={`flex-1 bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-300 ease-in-out ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={isDisabled}
    >
      {text}
    </button>
  )
}

export default SubmitButton
