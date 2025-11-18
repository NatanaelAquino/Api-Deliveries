# 🚚 Delivery API

Uma API backend para gerenciamento de entregas construída com **TypeScript**, **Express** e **PostgreSQL**.


## 📋 Visão Geral
API para:
- Cadastro e autenticação de usuários (JWT).
- Controle de papéis (customer / sale).
- Criação, listagem e atualização de entregas.
- Registro de logs de entregas.

## ✅ Principais Funcionalidades
- Autenticação JWT
- Controle de autorização por papel
- Prisma ORM para acesso ao PostgreSQL
- Validação com Zod
- Tratamento centralizado de erros (AppError)

## 🔧 Pré-requisitos
- Node.js 16+
- npm ou yarn
- PostgreSQL
- Docker (opcional)

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/seu-repo.git
cd seu-repo
```

2. Instale dependências:
```bash
npm install
# ou
yarn install
```

3. Crie o arquivo `.env` na raiz (exemplo):
```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/delivery"
JWT_SECRET="sua_chave_jwt"
PORT=3000
```

4. (Opcional) Subir PostgreSQL com Docker:
```powershell
docker run --name delivery-db -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
```

5. Executar migrações (Prisma):
```bash
npx prisma migrate dev
npx prisma generate
```

## ▶️ Scripts úteis
- Iniciar em dev: npm run dev
- Build: npm run build
- Iniciar: npm start
- Testes: npm test

(Ajuste conforme seus scripts no package.json)

## ▶️ Executando localmente
```bash
npm run dev
```
A API estará disponível em: http://localhost:3000

## 🧭 Endpoints principais

Autenticação:
- POST /sessions
  - body: { "email": "...", "password": "..." }
  - resposta: { "token": "..." }

Usuários:
- POST /users
  - body: { "name", "email", "password", "role?" }

Entregas (autenticado):
- POST /deliveries
  - requer papel `sale`
  - body: { "description", "user_id" }
- GET /deliveries
  - listar entregas do usuário autenticado
- PATCH /deliveries/:id/status
  - atualizar status da entrega

Exemplo de header autorizado:
```
Authorization: Bearer <SEU_TOKEN_AQUI>
```

## 🔐 Autenticação e autorização
- JWT com secret definido em JWT_SECRET.
- Middleware ensureAuthenticated popula `request.user = { id, role }`.
- Middleware verifyUserAuthorization valida papéis (ex.: ["sale"]).

## 🧪 Testes

Os testes usam Jest + Supertest para integração e o Prisma para manipular dados no banco durante os testes. Abaixo estão comandos úteis, organização e boas práticas.

- Onde ficam:
  - Arquivos em: src/tests/*.test.ts (ex.: users-controller.test.ts, sessions-controller.test.ts)

- Executar testes:
  - Todos os testes:
    ```bash
    npm test
    ```
  - Rodar em série (útil para evitar problemas com conexões concorrentes):
    ```bash
    npx jest --runInBand
    ```
  - Rodar um arquivo específico:
    ```bash
    npx jest src/tests/users-controller.test.ts
    ```
  - Gerar cobertura:
    ```bash
    npx jest --coverage
    ```

- Como os testes funcionam (padrão do projeto):
  1. Criam dados via endpoints (ex.: POST /users).
  2. Salvam ids retornados para remoção em afterAll/afterEach.
  3. Autenticam via POST /sessions para obter token.
  4. Usam token para chamadas autenticadas (Supertest).

- Boas práticas específicas para este projeto:
  - Use um banco de testes separado (ex.: DATABASE_URL_TEST) ou carregue um .env específico quando NODE_ENV=test.
  - Gere e-mails únicos nos testes (timestamp ou faker) para evitar conflitos de duplicidade.
  - Verifique existência de ids antes de deletar em afterAll (evita erros ao tentar deletar undefined).
  - Isolamento: cada teste deve preparar seu próprio estado; não dependa da ordem de execução.
  - Se houver instabilidade por concorrência no banco, use --runInBand ou configure um pool adequado.

- Observações sobre testes atuais:
  - Alguns testes salvam user_id para cleanup em afterAll — garanta que a variável seja atribuída mesmo que o teste falhe parcialmente.
  - Se usar Docker para o DB de teste, garanta que o container esteja ativo antes de rodar os testes.


## 💾 Banco de dados
- Prisma com arquivo schema.prisma em /prisma.
- Comandos:
  - npx prisma migrate dev
  - npx prisma studio (abrir GUI do DB)

## 📝 Boas práticas
- Não comite `.env`
- Use senhas seguras e variáveis de ambiente
- Rode os testes antes de abrir PR

## ⚙️ Debug / Logs
- Utilize o painel do VSCode / terminal para logs do servidor.
- Para testes isolados, use `--runInBand` no Jest se precisar serializar.

## 🧾 Licença
ISC

## 👤 Autor
Natanael Aquino

...existing code...