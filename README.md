# 🐤 GrowTwitter - API REST

Uma API completa inspirada no Twitter, desenvolvida com Node.js, Express, Prisma ORM e PostgreSQL.  
Com funcionalidades de cadastro e login de usuários, criação de tweets e respostas, sistema de seguidores, curtidas (likes), feed personalizado e documentação com Swagger.

---

## 🚀 Tecnologias Utilizadas

- **Node.js** com **Express**
- **TypeScript**
- **Prisma ORM**
- **PostgreSQL**
- **JWT** para autenticação
- **BCrypt** para hashing de senhas
- **Swagger Autogen** para documentação
- **Jest** para testes automatizados
- **dotenv** para variáveis de ambiente

---

## 📚 Funcionalidades Implementadas

### 👤 Usuários

- Cadastro de usuários (`/sign-up`)
- Login com retorno de token JWT (`/login`)
- Listagem de usuários (`/user`)
- Buscar usuário por ID (`/user/{id}`)
- Atualizar dados do usuário (`PUT /user/{id}`)
- Excluir usuário (`DELETE /user/{id}`)

### 📝 Tweets

- Criar tweet (`POST /tweets`)
- Listar todos os tweets (`GET /tweets`)
- Listar tweets por ID de usuário (`GET /tweets/{id}`)
- Criar reply (resposta) a tweet (`POST /tweets/{id}/reply`)
- Atualizar tweet (`PUT /tweets/{id}`)
- Deletar tweet (`DELETE /tweets/{id}`)

### 🧵 Feed

- Feed de tweets de usuários seguidos (`GET /feed`)

### 🤝 Seguidores

- Seguir usuários
- Listar seguidores

### ❤️ Likes

- Curtir tweets
- Atualizar curtidas
- Listar curtidas
- Deletar curtidas

---

## 🧪 Testes Automatizados

- Cobertura de **88%** de código (`statements`, `branches`, `functions` e `lines`)
- Testes **unitários** em todos os serviços (`services`)
- Uso de **mocks** para `prismaClient`, `bcrypt` e `jwt`
- Testes com diversos asserts (`toBeDefined`, `toThrow`, `toEqual`, `not.toHaveProperty`, etc.)
