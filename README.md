# Loja Web — Laboratório 02

Projeto desenvolvido para o Laboratório 02 da disciplina de Desenvolvimento Web, com foco em modelagem e acesso a banco de dados MySQL usando o ORM Prisma em um monorepo Node.js/TypeScript com interface web.

## Tecnologias

- **Node.js** v18+
- **TypeScript**
- **Express.js** — servidor HTTP e API REST
- **Prisma ORM** — modelagem e acesso ao banco
- **MySQL** — banco de dados relacional
- **HTML + CSS + JavaScript** — interface web (Vanilla)

## Estrutura do Projeto

```
loja-web/
├── prisma/
│   ├── schema.prisma    ← definição das tabelas
│   └── seed.ts          ← script para popular o banco
├── src/
│   ├── server.ts        ← servidor Express
│   ├── routes/
│   │   ├── clientes.ts
│   │   ├── produtos.ts
│   │   ├── compras.ts
│   │   └── categorias.ts
│   └── lib/
│       └── prisma.ts    ← instância singleton do Prisma Client
├── public/
│   ├── index.html
│   ├── style.css
│   └── app.js
└── img/                 ← screenshots do projeto
```

## Modelo de Dados

O banco possui 8 tabelas mapeadas via Prisma:

| Modelo | Tabela | Descrição |
|---|---|---|
| `Cliente` | `clientes` | Dados do cliente |
| `Endereco` | `enderecos` | Endereços vinculados ao cliente (1:N) |
| `Compra` | `compras` | Pedidos realizados |
| `ItemCompra` | `itens_compra` | Itens de cada compra (N:N entre Compra e Produto) |
| `Produto` | `produtos` | Catálogo de produtos |
| `NumeroSerie` | `numeros_serie` | Número de série único por produto (1:1) |
| `Categoria` | `categorias` | Categorias de produtos |
| `SubCategoria` | `subcategorias` | Subcategorias vinculadas a categorias |

## Rotas da API

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/clientes` | Lista todos os clientes |
| GET | `/api/clientes/:id` | Busca cliente por ID |
| POST | `/api/clientes` | Cria novo cliente |
| DELETE | `/api/clientes/:id` | Remove cliente |
| GET | `/api/produtos` | Lista todos os produtos |
| POST | `/api/produtos` | Cria novo produto |
| GET | `/api/categorias` | Lista todas as categorias |
| POST | `/api/categorias` | Cria nova categoria |
| GET | `/api/compras` | Lista todas as compras |
| POST | `/api/compras` | Registra nova compra |

## Como Rodar Localmente

### Pré-requisitos

- Node.js v18+
- MySQL rodando na porta 3306

### Instalação

```bash
# Instale as dependências
npm install

# Configure o banco no arquivo .env
DATABASE_URL="mysql://root:sua_senha@localhost:3306/loja_web"

# Crie o banco no MySQL
mysql -u root -p -e "CREATE DATABASE loja_web;"

# Aplique o schema
npm run db:push

# (Opcional) Popule com dados de exemplo
npm run db:seed

# Inicie o servidor
npm run dev
```

Acesse em: **http://localhost:3000**

### Scripts disponíveis

```bash
npm run dev          # Inicia em modo desenvolvimento
npm run build        # Compila TypeScript
npm run start        # Inicia a versão compilada
npm run db:push      # Aplica o schema no banco
npm run db:generate  # Gera o Prisma Client
npm run db:studio    # Abre o Prisma Studio (http://localhost:5555)
npm run db:seed      # Popula o banco com dados de exemplo
```

## Screenshots

![Interface Web](img/Screenshot%20from%202026-06-24%2023-12-41.png)
