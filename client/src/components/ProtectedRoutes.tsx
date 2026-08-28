import React, { useEffect } from 'react'
import { useAuthStore } from '../stores/useAuthStore'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes: React.FC = () => {
    const { isAuthenticated, checkAuth, checkingAuth } = useAuthStore(state => state)

    useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (checkingAuth) {
    return <div className="p-4">Verifying authentication...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

    return <Outlet />
}

export default ProtectedRoutes
