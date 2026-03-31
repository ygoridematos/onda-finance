import { mockUser } from './mockData'
import type { User } from '@/types'

interface LoginCredentials {
  email: string
  password: string
}

interface LoginResponse {
  user: Omit<User, 'password'>
  token: string
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 800)) // simula delay de rede

    if (
      credentials.email === mockUser.email &&
      credentials.password === mockUser.password
    ) {
      return {
        user: {
          name: mockUser.name,
          email: mockUser.email,
        },
        token: 'mock-jwt-token-onda-finance',
      }
    }

    throw new Error('Credenciais inválidas')
  },
}