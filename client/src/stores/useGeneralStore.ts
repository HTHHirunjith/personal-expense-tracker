import { create } from 'zustand'

interface GeneralState {
  isTransactionFormOpen: boolean,
  isCategoryFormOpen: boolean,
  isEditTransactionFormOpen: boolean,
  openCreateTransactionModal: () => void,
  closeCreateTransactionModal: () => void,
  openCreateCategoryModal: () => void,
  closeCreateCategoryModal: () => void,
  openEditTransactionModal: () => void,
  closeEditTransactionModal: () => void
}

export const useGeneralStore = create<GeneralState>((set) => ({
  isTransactionFormOpen: false,
  isCategoryFormOpen: false,
  isEditTransactionFormOpen: false,
  openCreateTransactionModal: () => set({ isTransactionFormOpen: true }),
  closeCreateTransactionModal: () => set({ isTransactionFormOpen: false }),
  openCreateCategoryModal: () => set({ isCategoryFormOpen: true }),
  closeCreateCategoryModal: () => set({ isCategoryFormOpen: false }),
  openEditTransactionModal: () => set({ isEditTransactionFormOpen: true }),
  closeEditTransactionModal: () => set({ isEditTransactionFormOpen: false }),
}))
