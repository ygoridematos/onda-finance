import { describe, it, expect } from 'vitest'
import { authService } from '@/services/authService'

describe('authService', () => {
  it('deve autenticar com credenciais corretas', async () => {
    const response = await authService.login({
      email: 'ygor@onda.com',
      password: '123456',
    })
    expect(response.user.email).toBe('ygor@onda.com')
    expect(response.token).toBe('mock-jwt-token-onda-finance')
  })

  it('não deve retornar a senha do usuário', async () => {
    const response = await authService.login({
      email: 'ygor@onda.com',
      password: '123456',
    })
    expect(response.user).not.toHaveProperty('password')
  })

  it('deve lançar erro com credenciais inválidas', async () => {
    await expect(
      authService.login({
        email: 'errado@email.com',
        password: 'senhaerrada',
      })
    ).rejects.toThrow('Credenciais inválidas')
  })
})