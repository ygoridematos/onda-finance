import { z } from 'zod'

export const transferSchema = z.object({
  recipient: z
    .string()
    .min(1, 'Destinatário é obrigatório')
    .min(3, 'Nome deve ter pelo menos 3 caracteres'),
  amount: z
    .string()
    .min(1, 'Valor é obrigatório')
    .refine((val) => !isNaN(Number(val)), 'Valor inválido')
    .refine((val) => Number(val) > 0, 'Valor deve ser maior que zero'),
  description: z.string().optional(),
})

export type TransferFormData = z.infer<typeof transferSchema>