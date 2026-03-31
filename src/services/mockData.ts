import type { User, Transaction } from '@/types'

export const mockUser: User = {
  name: 'Ygor Oliveira',
  email: 'ygor@onda.com',
  password: '123456',
}

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'credit',
    description: 'Salário',
    amount: 8000,
    date: '2026-03-01',
  },
  {
    id: '2',
    type: 'debit',
    description: 'Aluguel',
    amount: 1500,
    date: '2026-03-05',
  },
  {
    id: '3',
    type: 'credit',
    description: 'Freelance',
    amount: 2000,
    date: '2026-03-10',
  },
  {
    id: '4',
    type: 'debit',
    description: 'Supermercado',
    amount: 350,
    date: '2026-03-15',
  },
  {
    id: '5',
    type: 'debit',
    description: 'Transferência enviada',
    amount: 500,
    date: '2026-03-20',
  },
]