# 🚚 Delivery API

Uma aplicação backend para gerenciamento de entregas construída com
**TypeScript**, **Express** e **PostgreSQL**.

> ⚠️ **Status do projeto:** Em desenvolvimento\
> Novos recursos, endpoints e melhorias estão sendo implementados.

## 📋 Visão Geral

A **Delivery API** é um sistema de backend que permite criar usuários,
autenticar via JWT e gerenciar entregas. O sistema possui diferentes
papéis de usuário (cliente e vendedor) com níveis de autorização
específicos.

## 🚀 Começando

### ✔️ Pré-requisitos

-   Node.js 16+\
-   PostgreSQL\
-   npm ou yarn\
-   Docker (opcional)

## 🛠️ Instalação

### 1. Clone o repositório

``` bash
git clone https://github.com/seu-usuario/seu-repo.git
cd seu-repo
```

### 2. Instale as dependências

``` bash
npm install
# ou
yarn install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz:

    DATABASE_URL="postgresql://usuario:senha@localhost:5432/delivery"
    JWT_SECRET="sua_chave_jwt"

### 4. Suba o PostgreSQL com Docker (opcional)

``` bash
docker run --name delivery-db -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
```

### 5. Execute as migrações do Prisma

``` bash
npx prisma migrate dev
```

## ▶️ Executando a Aplicação

#### Modo desenvolvimento:

``` bash
npm run dev
```

Servidor rodando em:\
👉 **http://localhost:3000**

## 📁 Estrutura do Projeto

    src/
     ├── controllers/
     ├── services/
     ├── middlewares/
     ├── repositories/
     ├── routes/
     ├── prisma/
     ├── utils/
     └── app.ts

## 🔑 Endpoints da API

### 👤 Usuários

**POST /users** --- Criar novo usuário

### 🔐 Sessões

**POST /sessions** --- Login e receber token JWT

### 📦 Entregas

**POST /deliveries** --- Criar uma entrega *(requer papel sale)*

## 🔐 Autenticação e Autorização

A API utiliza **JWT**. Inclua o token no header:

    Authorization: Bearer SEU_TOKEN_AQUI

### Papéis do sistema

  Papel        Descrição
  ------------ --------------------------------
  `customer`   Usuário comum
  `sale`       Vendedor (pode criar entregas)

## 🗄️ Schema do Banco de Dados

### 🧑‍💼 Usuários

-   `id` --- UUID\
-   `name`\
-   `email` (único)\
-   `password` (hash)\
-   `role` (customer/sale)\
-   `created_at`\
-   `updated_at`

### 📦 Entregas

-   `id` --- UUID\
-   `user_id`\
-   `description`\
-   `status` (processing/shipped/delivered)\
-   `created_at`\
-   `updated_at`

### 📝 Logs de Entrega

-   `id` --- UUID\
-   `description`\
-   `delivery_id`\
-   `created_at`\
-   `updated_at`

## 🛠️ Stack de Tecnologias

-   **Node.js**
-   **TypeScript**
-   **Express.js**
-   **Prisma ORM**
-   **PostgreSQL**
-   **JWT**
-   **Bcrypt**
-   **Zod**

## 📦 Dependências Principais

-   `express`\
-   `@prisma/client`\
-   `jsonwebtoken`\
-   `bcrypt`\
-   `zod`\
-   `express-async-errors`

## 🧪 Tratamento de Erros

A API possui um middleware global que lida com:\
- Erros personalizados (`AppError`)\
- Erros do Zod\
- Erros inesperados com resposta genérica

## 📜 Licença

ISC

## 👤 Autor

**Natanael Aquino**
