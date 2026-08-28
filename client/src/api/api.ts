import axios from 'axios'
import { useAuthStore } from '../stores/useAuthStore';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
})

// add token to headers
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// global error-handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if(error.response.status === 401 || error.response.status === 403) {
      useAuthStore.getState().logout()
    }
    return Promise.reject(error)
  }
)

export default api
