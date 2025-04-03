# GrowTwitter - API e DB

## 📌 Sobre o Projeto

O **GrowTwitter** é uma API desenvolvida com **Node.js**, **Express** e **Prisma ORM**, conectada a um banco de dados **PostgreSQL**. A API implementa uma rede social estilo Twitter, permitindo o gerenciamento de usuários, tweets, likes e autenticação.

## 🚀 Funcionalidades

- **Cadastro de Usuários** (Nome, E-mail, Username, Senha)
- **Autenticação de Usuários** (Login com E-mail/Username e Senha)
- **Criação e Gerenciamento de Tweets** (Tweets e Replies)
- **Sistema de Likes em Tweets**
- **Sistema de Seguidores**

## 📦 Tecnologias Utilizadas

- **Node.js** + **Express.js** → Construção da API REST
- **Prisma ORM** → Modelagem e gerenciamento do banco de dados
- **PostgreSQL** → Banco de dados relacional
- **JWT (JSON Web Token)** → Autenticação e segurança
- **Bcrypt.js** → Criptografia de senhas
- **Dotenv** → Gerenciamento de variáveis de ambiente

## 🏗 Modelagem do Banco de Dados

O banco de dados foi modelado utilizando **Prisma ORM** com suporte para PostgreSQL. A estrutura básica inclui:

- **Usuários**
- **Tweets**
- **Likes**
- **Seguidores**
