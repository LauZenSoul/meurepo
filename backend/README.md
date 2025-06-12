# Backend do Instituto Médio Rural Digital

Este é o backend do projeto do Instituto Médio Rural Digital, desenvolvido com Node.js, Express e MongoDB.

## Requisitos

- Node.js (versão 14 ou superior)
- MongoDB
- npm ou yarn

## Instalação

1. Clone o repositório
2. Entre na pasta do projeto:
```bash
cd backend
```

3. Instale as dependências:
```bash
npm install
```

4. Crie um arquivo `.env` baseado no `.env.example` e configure as variáveis de ambiente

5. Execute o projeto em modo de desenvolvimento:
```bash
npm run dev
```

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor em modo de desenvolvimento
- `npm run build`: Compila o TypeScript para JavaScript
- `npm start`: Inicia o servidor em modo de produção

## Estrutura do Projeto

```
src/
  ├── config/        # Configurações do projeto
  ├── controllers/   # Controladores das rotas
  ├── middlewares/   # Middlewares personalizados
  ├── models/        # Modelos do MongoDB
  ├── routes/        # Rotas da aplicação
  └── server.ts      # Arquivo principal do servidor
```

## Tecnologias Utilizadas

- Node.js
- Express
- TypeScript
- MongoDB com Mongoose
- Cors
- Dotenv 