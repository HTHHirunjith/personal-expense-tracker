import { create } from 'zustand'
import { jwtDecode } from 'jwt-decode'

interface AuthState {
  token: string | null
  isAuthenticated: boolean
  checkingAuth: boolean
  login: (token: string) => void
  register: (token: string) => void
  logout: () => void
  checkAuth: () => void
}

const isTokenValid = (token: string | null): boolean => {
  if (!token) return false
  try {
    const { exp } = jwtDecode<{ exp: number }>(token)
    return Date.now() < exp * 1000
  } catch {
    return false
  }
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  isAuthenticated: false,
  checkingAuth: true,

  login: (token) => {
    localStorage.setItem('token', token)
    set({ token, isAuthenticated: isTokenValid(token), checkingAuth: false })
  },

  register: (token: string) => {
    localStorage.setItem('token', token)
    set({ token, isAuthenticated: isTokenValid(token), checkingAuth: false })
  },

  logout: () => {
    localStorage.removeItem('token')
    set({ token: null, isAuthenticated: false, checkingAuth: false })
  },

  checkAuth: () => {
    const token = localStorage.getItem('token')
    const isValid = isTokenValid(token)
    set({ token: isValid ? token : null, isAuthenticated: isValid, checkingAuth: false })
  },
}))
