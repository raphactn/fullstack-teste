# Fullstack Project - Setup Guide

Este README contém todas as instruções necessárias para rodar o projeto
**com Docker** e **sem Docker**, além da configuração do Prisma, banco
de dados e JWT.

---

# 📋 Pré-requisitos

Antes de começar, você precisa ter instalado:

- Node.js \>= 20
- npm ou yarn
- Docker + Docker Compose (opcional, mas recomendado)
- PostgreSQL (apenas se for rodar sem Docker)

---

# 🔐 Gerando o JWT Secret

O backend precisa de um segredo para assinar os tokens.

Execute no terminal:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Copie o valor gerado e coloque no `.env` do backend:

```env
JWT_ACCESS_SECRET="SEU_SECRET_AQUI"
```

---

# 🐳 Rodando com Docker (RECOMENDADO)

## 1️⃣ Pare seu PostgreSQL local

Se você tiver um Postgres rodando na máquina, pare-o para evitar
conflito na porta **5432**.

### Linux:

```bash
sudo service postgresql stop
```

### Mac:

```bash
brew services stop postgresql
```

---

## 2️⃣ Suba os containers

Na raiz do backend:

```bash
docker compose up --build
```

Ou em background:

```bash
docker compose up -d --build
```

Isso irá subir:

✅ PostgreSQL\
✅ Backend NestJS

---

## 3️⃣ Rode o Prisma (PRIMEIRA VEZ)

Abra outro terminal e execute:

```bash
docker exec -it backend npx prisma db push
```

Opcional (gerar client manualmente):

```bash
docker exec -it backend npx prisma generate
```

---

## 4️⃣ Subir o Frontend

Dentro da pasta do frontend:

```bash
docker compose up --build
```

Frontend disponível em:

    http://localhost:3000

---

# 💻 Rodando SEM Docker

## 1️⃣ Configure o PostgreSQL

Crie um banco chamado:

    app_db

Usuário padrão sugerido:

    postgres
    senha: postgres

---

## 2️⃣ Ajuste o .env do Backend

Se estiver rodando localmente, troque o host:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/app_db"
PORT="5000"
FRONTEND_URL="http://localhost:3000"
JWT_ACCESS_SECRET="SEU_SECRET"
```

---

## 3️⃣ Instale as dependências

### Backend

```bash
npm install
```

### Frontend

```bash
npm install
```

---

## 4️⃣ Inicialize o Prisma

Dentro da pasta do backend:

### Sincronizar schema (mais rápido para DEV):

```bash
npx prisma db push
```

Gerar client:

```bash
npx prisma generate
```

---

## 5️⃣ Rodar os projetos

### Backend:

```bash
npm run start:dev
```

Servidor:

    http://localhost:5000

---

### Frontend:

```bash
npm run dev
```

App:

    http://localhost:3000

---

# ⚠️ Problemas Comuns

## Porta 5432 já está em uso

Pare o Postgres local antes de subir o Docker.

---

## Prisma não conecta ao banco

Verifique se:

- O Postgres está rodando
- A DATABASE_URL está correta
- O banco existe

---

## Alterou o schema do Prisma?

Sempre rode:

```bash
npx prisma db push
```

---

# 🚀 Fluxo recomendado para desenvolvimento

1.  Suba o banco com Docker\
2.  Rode `prisma db push`\
3.  Inicie backend\
4.  Inicie frontend
