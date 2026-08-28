import { useState } from "react"
import api from "../api/api"

interface ApiResponse<T> {
  data: T | null
  error: string | null
  loading: boolean
}

export const useApiClient = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  async function get<T>(url: string): Promise<ApiResponse<T>> {
    setLoading(true)
    setError(null)

    try {
      const res = await api.get<T>(url)
      return {
        data: res.data,
        error: null,
        loading: false
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const message = error.response?.data?.message || error.message
      setError(message)
      return {
        data: null,
        error: message,
        loading: false
      }
    } finally {
      setLoading(false)
    }
  }

  async function post<T>(url: string, data: unknown): Promise<ApiResponse<T>> {
    setLoading(true)
    setError(null)

    try {
      const res = await api.post<T>(url, data)
      return {
        data: res.data,
        error: null,
        loading: false
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const message = error.response?.data?.message || error.message
      setError(message)
      return {
        data: null,
        error: message,
        loading: false
      }
    } finally {
      setLoading(false)
    }
  }

  async function put<T>(url: string, data: unknown): Promise<ApiResponse<T>> {
    setLoading(true)
    setError(null)
    
    try {
      const res = await api.put<T>(url, data)
      return {
        data: res.data,
        error: null,
        loading: false
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const message = error.response?.data?.message || error.message
      setError(message)
      return {
        data: null,
        error: message,
        loading: false
      }
    } finally {
      setLoading(false)
    }
  }

  async function del<T>(url: string): Promise<ApiResponse<T>> {
    setLoading(true)
    setError(null)
    
    try {
      const res = await api.delete<T>(url)
      return {
        data: res.data,
        error: null,
        loading: false
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      const message = error.response?.data?.message || error.message
      setError(message)
      return {
        data: null,
        error: message,
        loading: false
      }
    } finally {
      setLoading(false)
    }
  }

  return { get, post, put, del, loading, error }
}
