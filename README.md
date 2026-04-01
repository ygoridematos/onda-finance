# Onda Finance 🌊

Aplicação web simulando um app bancário simples, desenvolvida como desafio técnico para a Onda Finance.

## 🔗 Acesso

[Acessar aplicação](https://onda-finance-delta.vercel.app/)

Credenciais de teste:
- **E-mail:** ygor@onda.com
- **Senha:** 123456

## 🚀 Como rodar o projeto

### Pré-requisitos
- Node.js 18+
- npm

### Instalação
```bash
# Clone o repositório
git clone https://github.com/seu-usuario/onda-finance.git

# Acesse a pasta
cd onda-finance

# Instale as dependências
npm install

# Rode em desenvolvimento
npm run dev

# Rode os testes
npm run test
```

## 🛠️ Stack utilizada

| Tecnologia | Função |
|------------|--------|
| React + TypeScript | Base da aplicação com tipagem estática |
| Vite | Bundler e dev server |
| Tailwind CSS v4 | Estilização utilitária |
| CVA + shadcn/ui + Radix | Componentes acessíveis e estilizados |
| React Router | Roteamento client-side |
| React Query | Gerenciamento de estado do servidor |
| Zustand | Estado global com persistência |
| React Hook Form + Zod | Formulários com validação de schema |
| Axios | Cliente HTTP |
| Vitest | Testes unitários |

## 🏗️ Decisões técnicas

### Estrutura de pastas
O projeto segue separação clara por responsabilidade: `pages` para telas, `components` para UI reutilizável, `services` para chamadas de API, `store` para estado global, `schemas` para validações e `types` para tipagem compartilhada.

### Zustand com persist
O estado de autenticação e saldo são persistidos no localStorage via middleware `persist` do Zustand. Isso garante que a sessão sobrevive a recarregamentos de página sem necessidade de backend.

### Mock de API com delay simulado
Os serviços utilizam Axios estruturado como em produção, com delays simulados (`setTimeout`) para representar latência de rede real. Substituir os mocks por uma API real exigiria apenas alterar a implementação dos serviços, sem tocar nos componentes.

### React Hook Form + Zod
A validação é definida em schemas Zod separados dos componentes, permitindo reuso e testabilidade. O `zodResolver` conecta os schemas ao React Hook Form sem boilerplate.

### Rota protegida com hidratação
O `PrivateRoute` aguarda a hidratação do Zustand antes de decidir o redirecionamento, evitando flashes de conteúdo ou redirecionamentos incorretos ao recarregar páginas autenticadas.

## ✅ Testes

Fluxos testados com Vitest:

- **loginSchema:** validação de e-mail, senha e campos obrigatórios
- **authService:** autenticação com credenciais corretas, rejeição de credenciais inválidas e garantia de que a senha não é retornada
```bash
npm run test
```

## 🔒 Segurança (considerações)

### Engenharia reversa
Em produção, o código seria protegido por:
- **Minificação e ofuscação** do bundle via Vite no build de produção
- **Variáveis de ambiente** (`.env`) para chaves e URLs sensíveis, nunca expostas no repositório
- **Tokens JWT** com curta expiração e renovação via refresh token
- **HTTPS obrigatório** em todas as comunicações

### Vazamento de dados
- **Nunca retornar campos sensíveis** (ex: senha) nas respostas de API — aplicado no `authService` via `Omit<User, 'password'>`
- **Sanitização de inputs** no backend para prevenir XSS e SQL Injection
- **Headers de segurança HTTP** (CSP, HSTS, X-Frame-Options) configurados no servidor
- **Tokens armazenados em httpOnly cookies** em produção (não localStorage), impedindo acesso via JavaScript
- **Rate limiting** nas rotas de autenticação para prevenir ataques de força bruta

## 🔮 Melhorias futuras

- Autenticação real com JWT e refresh token
- Paginação no histórico de transações
- Filtros por data e tipo na listagem de transações
- Modo escuro (dark mode)
- Gráfico de evolução do saldo
- Notificações de transferência
- Testes de integração com Testing Library
- PWA para acesso mobile