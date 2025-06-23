# Login Backend

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">
  <b>Login Back</b> — API de autenticação e gestão de usuários desenvolvida em <a href="https://nestjs.com/" target="_blank">NestJS</a> e <a href="https://typeorm.io/" target="_blank">TypeORM</a>.
</p>

---

## Sumário

- [Descrição](#descrição)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Execução](#execução)
- [Endpoints Principais](#endpoints-principais)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Arquitetura](#arquitetura)
- [Testes](#testes)
- [Licença](#licença)

---

## Descrição

API para autenticação, cadastro e gerenciamento de usuários, com controle de permissões (`admin` e `user`), listagem paginada, filtro por perfil e identificação de usuários inativos. Ideal para servir como base de autenticação em aplicações Node.js modernas.

---

## Instalação

---

## Configuração

Crie um arquivo `.env` baseado no `.env.example` e configure as variáveis de ambiente, como conexão com banco de dados e chave JWT. O `.env.example` já possui a configuração necessária, só copiar os dados do arquivo e colar dentro do `.env` depois alterar o host do banco de dados para localhost ou 127.0.0.1

> **Dica:**
> Você pode copiar o arquivo `.env.example` e renomear para `.env` para facilitar.
> O arquivo `.env.example` já contém todas as variáveis necessárias para rodar o projeto.

---

### Usando Docker Compose

O projeto possui um arquivo `docker-compose.yml` para facilitar a execução do ambiente completo (API + banco de dados).

1. **Configure o arquivo `.env`**
   Crie um arquivo `.env` baseado no `.env.example` e ajuste as variáveis conforme necessário. O `.env.example` já possui a configuração necessária, basta copiar os dados do arquivo e colar dentro do `.env`.

2. **Suba os containers**
   Execute o comando abaixo na raiz do projeto:

   ```bash
   docker-compose up --build
   ```

   Isso irá subir a API e o banco de dados (PostgreSQL) já configurados.

3. **Acesse a aplicação**
   - API: [http://localhost:3001/api](http://localhost:3001/api)
   - Banco de dados: disponível na porta definida no `docker-compose.yml`

### Instalação manual (sem Docker)

Se preferir rodar localmente sem Docker:

```bash
npm install
```

Siga os passos de configuração e execução descritos abaixo.

## Execução

```bash
# Desenvolvimento
npm run start:dev
```

Acesse a documentação Swagger em: [http://localhost:3001/api](http://localhost:3001/api)

---

## Endpoints Principais

### Autenticação

- `POST /v1/auth/signin` — Login do usuário
- `POST /v1/auth/signup` — Cadastro de novo usuário

### Usuários

- `GET /v1/users` — Lista usuários com filtros e paginação
- `GET /v1/users/inactives` — Lista usuários inativos (sem login nos últimos 30 dias)
- `GET /v1/users/:id` — Detalhes de um usuário
- `PATCH /v1/users/change-user` — Atualiza dados do usuário autenticado
- `PATCH /v1/users/:id/permissions` — Atualiza permissões (admin, user)
- `PATCH /v1/users/change-password` — Altera senha do usuário autenticado
- `DELETE /v1/users/:id` — Remove um usuário

---

## Estrutura do Projeto

- `src/application/use-cases/user/services/` — Serviços de negócio dos usuários
- `src/infrastructure/repositories/` — Repositórios de acesso a dados
- `src/presentation/user/` — Controllers, DTOs e validações
- `src/shared/` — Utilitários, configurações e tipos comuns

---

## Arquitetura

O projeto segue princípios de arquitetura limpa (Clean Architecture), separando responsabilidades em camadas:

- **Domain:** Entidades e regras de negócio puras.
- **Application:** Casos de uso (serviços) e interfaces de repositórios.
- **Infrastructure:** Implementações concretas de repositórios, integração com banco de dados e serviços externos.
- **Presentation:** Controllers, DTOs, validações e documentação Swagger.

Essa abordagem facilita testes, manutenção e evolução do sistema, além de permitir a troca de tecnologias de infraestrutura sem impacto nas regras de negócio.

---

## Testes

```bash
npm run test
```

---

## Licença

[MIT](LICENSE)
