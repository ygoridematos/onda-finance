import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuthStore } from '@/store/useAuthStore'
import { transferSchema, type TransferFormData } from '@/schemas/transferSchema'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function TransferPage() {
  const navigate = useNavigate()
  const balance = useAuthStore((state) => state.balance)
  const updateBalance = useAuthStore((state) => state.updateBalance)
  const addTransaction = useAuthStore((state) => state.addTransaction)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const formatCurrency = (value: number) =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TransferFormData>({
    resolver: zodResolver(transferSchema),
  })

  const onSubmit = async (data: TransferFormData) => {
    const amount = Number(data.amount)

    if (amount > balance) {
      setError('Saldo insuficiente para realizar esta transferência')
      return
    }

    await new Promise((resolve) => setTimeout(resolve, 1000))

    updateBalance(amount)

    addTransaction({
      id: crypto.randomUUID(),
      type: 'debit',
      description: data.description
        ? `Transferência para ${data.recipient} — ${data.description}`
        : `Transferência para ${data.recipient}`,
      amount,
      date: new Date().toISOString().split('T')[0],
    })

    setSuccess(true)
    setTimeout(() => navigate('/dashboard'), 1500)
  }

  return (
    <div className="min-h-screen bg-muted/40 p-6">
      <div className="max-w-md mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate('/dashboard')}>
            ← Voltar
          </Button>
          <h1 className="text-2xl font-bold">Nova Transferência</h1>
        </div>

        {/* Saldo atual */}
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Saldo disponível</p>
            <p className="text-2xl font-bold">{formatCurrency(balance)}</p>
          </CardContent>
        </Card>

        {/* Formulário */}
        <Card>
          <CardHeader>
            <CardTitle>Dados da transferência</CardTitle>
            <CardDescription>
              Preencha os dados para realizar a transferência
            </CardDescription>
          </CardHeader>
          <CardContent>
            {success ? (
              <div className="text-center space-y-2 py-4">
                <p className="text-4xl">✅</p>
                <p className="font-semibold text-lg">Transferência realizada!</p>
                <p className="text-sm text-muted-foreground">
                  Redirecionando para o dashboard...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="recipient">Destinatário</Label>
                  <Input
                    id="recipient"
                    placeholder="Nome do destinatário"
                    {...register('recipient')}
                  />
                  {errors.recipient && (
                    <p className="text-sm text-destructive">{errors.recipient.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Valor (R$)</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0,00"
                    {...register('amount')}
                  />
                  {errors.amount && (
                    <p className="text-sm text-destructive">{errors.amount.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">
                    Descrição{' '}
                    <span className="text-muted-foreground text-xs">(opcional)</span>
                  </Label>
                  <Input
                    id="description"
                    placeholder="Ex: Pagamento de serviço"
                    {...register('description')}
                  />
                </div>

                {error && (
                  <div className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    {error}
                  </div>
                )}

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Processando...' : 'Confirmar Transferência'}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

      </div>
    </div>
  )
}