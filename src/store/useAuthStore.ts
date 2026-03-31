import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Transaction } from '@/types'
import { mockTransactions } from '@/services/mockData'

interface User {
  name: string
  email: string
}

interface AuthState {
  user: User | null
  balance: number
  isAuthenticated: boolean
  transactions: Transaction[]
  login: (user: User) => void
  logout: () => void
  updateBalance: (amount: number) => void
  addTransaction: (transaction: Transaction) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      balance: 5000,
      isAuthenticated: false,
      transactions: mockTransactions,

      login: (user) => set({ user, isAuthenticated: true }),

      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
          transactions: mockTransactions,
          balance: 5000,
        }),

      updateBalance: (amount) =>
        set((state) => ({ balance: state.balance - amount })),

      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [transaction, ...state.transactions],
        })),
    }),
    {
      name: 'onda-auth',
      partialize: (state) => ({
        user: state.user,
        balance: state.balance,
        isAuthenticated: state.isAuthenticated,
        transactions: state.transactions,
      }),
    }
  )
)