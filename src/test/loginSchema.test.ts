import { describe, it, expect } from 'vitest'
import { loginSchema } from '@/schemas/loginSchema'

describe('loginSchema', () => {
  it('deve validar credenciais corretas', () => {
    const result = loginSchema.safeParse({
      email: 'ygor@onda.com',
      password: '123456',
    })
    expect(result.success).toBe(true)
  })

  it('deve rejeitar email inválido', () => {
    const result = loginSchema.safeParse({
      email: 'email-invalido',
      password: '123456',
    })
    expect(result.success).toBe(false)
    expect(result.error?.issues[0].message).toBe('E-mail inválido')
  })

  it('deve rejeitar senha com menos de 6 caracteres', () => {
    const result = loginSchema.safeParse({
      email: 'ygor@onda.com',
      password: '123',
    })
    expect(result.success).toBe(false)
    expect(result.error?.issues[0].message).toBe('A senha deve ter pelo menos 6 caracteres')
  })

  it('deve rejeitar campos vazios', () => {
    const result = loginSchema.safeParse({
      email: '',
      password: '',
    })
    expect(result.success).toBe(false)
  })
})