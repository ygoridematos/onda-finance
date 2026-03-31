import { mockTransactions } from './mockData'
import type { Transaction } from '@/types'

export const transactionService = {
  getAll: async (): Promise<Transaction[]> => {
    await new Promise((resolve) => setTimeout(resolve, 600)) // simula delay
    return mockTransactions
  },
}