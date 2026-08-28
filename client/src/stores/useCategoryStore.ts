import { create } from 'zustand'
import type { Category } from '../types/dashboard'

type CategoryState = {
  categories: Category[]
  getAllCategories: (categories: Category[]) => void
}

export const useCategoryStore = create<CategoryState>((set) => ({
  categories: [],
  getAllCategories: (categories: Category[]) => set({ categories })
}))