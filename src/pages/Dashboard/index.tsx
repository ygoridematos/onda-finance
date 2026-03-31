import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/useAuthStore'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function DashboardPage() {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const balance = useAuthStore((state) => state.balance)
  const logout = useAuthStore((state) => state.logout)
  const transactions = useAuthStore((state) => state.transactions)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const formatCurrency = (value: number) =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('pt-BR')

  return (
    <div className="min-h-screen bg-muted/40 p-6">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Olá, {user?.name?.split(' ')[0]} 👋</h1>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            Sair
          </Button>
        </div>

        {/* Saldo */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Saldo disponível
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{formatCurrency(balance)}</p>
          </CardContent>
        </Card>

        {/* Botão de Transferência */}
        <Button className="w-full" onClick={() => navigate('/transfer')}>
          Nova Transferência
        </Button>

        {/* Transações */}
        <Card>
          <CardHeader>
            <CardTitle>Últimas transações</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {transactions.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                Nenhuma transação encontrada
              </p>
            ) : (
              transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between py-2 border-b last:border-0"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{transaction.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(transaction.date)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={transaction.type === 'credit' ? 'default' : 'destructive'}>
                      {transaction.type === 'credit' ? 'Entrada' : 'Saída'}
                    </Badge>
                    <span
                      className={`text-sm font-semibold ${
                        transaction.type === 'credit'
                          ? 'text-green-600'
                          : 'text-destructive'
                      }`}
                    >
                      {transaction.type === 'credit' ? '+' : '-'}
                      {formatCurrency(transaction.amount)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

      </div>
    </div>
  )
}