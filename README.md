# Biblioteca Comunitária

Projeto simples de API REST para gerenciamento de usuários, livros e empréstimos (Biblioteca Comunitária).

## Descrição

API construída com Node.js, Express e SQLite. Suporta cadastro/login de usuários (JWT), CRUD de livros e controle de empréstimos. Envio de e-mails de lembrete via `nodemailer` também está implementado.

## Estrutura principal

- `src/config` — configuração da conexão com o banco (SQLite).
- `src/controller` — controladores/handlers das rotas.
- `src/service` — regras de negócio (serviços).
- `src/repositories` — acesso ao banco (queries SQL simples).
- `src/routes` — definição das rotas Express.
- `src/schema` — validações com Zod.

## Pré-requisitos

- Node.js v16+ recomendado
- npm

## Instalação

1. Clone o repositório

2. Instale dependências:

```bash
npm install
```

3. Crie um arquivo `.env` na raiz com as variáveis necessárias (veja `.env.example`):

- `PORT` — porta do servidor (ex: `3000`)
- `SECRET_JWT` — segredo para geração de tokens JWT
- `EMAIL_USER` e `EMAIL_PASS` — credenciais do Gmail (se for usar envio de e-mail)

Exemplo mínimo (`.env`):

```
PORT=3000
SECRET_JWT=algumsegredoforte
EMAIL_USER=seu-email@gmail.com
EMAIL_PASS=sua-senha-ou-app-password
```

> Observação: para envio via Gmail, talvez seja necessário criar uma senha de app ou ajustar configurações de conta.

## Rodando a aplicação

```bash
npm run dev
```

O servidor irá criar (se não existir) o banco SQLite e expor as rotas na porta configurada.

## Rotas principais

- `POST /users` — criar usuário (body: `username`, `email`, `password`, `avatar?`)
- `POST /users/login` — login (body: `email`, `password`) — retorna JWT
- `GET /books` — listar livros (pública)
- `POST /books` — criar livro (autenticada)

As rotas estão definidas em `src/routes/`.

## Banco de dados

O projeto usa SQLite via `src/config/database.js`. O arquivo do banco é criado automaticamente (veja a configuração nesse arquivo).

## Notas de segurança

- Não faça commit de `.env` com credenciais reais.
- Use um `SECRET_JWT` forte em produção.

## Testes rápidos

1. Crie um usuário via `POST /users`.
2. Faça `POST /users/login` para obter token JWT.
3. Use o header `Authorization: Bearer <TOKEN>` para acessar rotas protegidas, ex: `POST /books`.

## Contribuição

Pull requests são bem-vindos. Sinta-se à vontade para abrir issues com sugestões ou bugs.

---
Arquivo principal: `src/index.js` — ponto de entrada da aplicação.
