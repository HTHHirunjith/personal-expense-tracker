import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../stores/useAuthStore"
import { useApiClient } from "./useApiClient"

interface AuthResponse {
  token: string
}

interface LoginCredentials {
  email: string
  password: string
}

interface RegisterCredentials {
  firstName: string
  lastName: string
  email: string
  password: string
}

export const useAuth = () => {
  const navigate = useNavigate()
  const { post, loading, error } = useApiClient()
  const state = useAuthStore(state => state)

  const login = async (credentials: LoginCredentials) => {
    const { data, error } = await post<AuthResponse>("/auth/login", credentials)

    if(data?.token) {
      state.login(data.token)
      navigate('/')
    }

    return { data, error }
  }

  const register = async (credentials: RegisterCredentials) => {
    const { data, error } = await post<AuthResponse>("/auth/register", credentials)

    if(data?.token) {
      state.register(data.token)
      navigate('/')
    }

    return { data, error }
  }



  return { login, register, loading, error }
}
