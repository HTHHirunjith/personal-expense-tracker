import React from 'react'

interface SubmitButtonProps {
  text: string
  isDisabled?: boolean
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ text, isDisabled }) => {
  return (
    <button
      type="submit"
      className={`w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600/30 ${
        isDisabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:bg-blue-700'
      }`}
      disabled={isDisabled}
    >
      {text}
    </button>
  )
}

export default SubmitButton
