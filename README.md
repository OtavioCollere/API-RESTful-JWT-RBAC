# API RESTful – JWT & RBAC

Projeto em desenvolvimento com foco exclusivo no **fluxo de autenticação e autorização** (JWT + RBAC), construído com NestJS.

Este repositório tem como objetivo **aprofundar o entendimento prático e conceitual** sobre autenticação, controle de acesso baseado em papéis (RBAC) e boas práticas no design de APIs RESTful.

> ⚠️ Projeto ainda em construção — a prioridade está em consolidar o domínio da parte de autenticação antes de avançar para outros recursos.

## Objetivos do projeto

- Implementar autenticação via JWT (com e sem Passport)
- Criar fluxo completo de registro e login de usuários
- Aplicar RBAC (Role-Based Access Control) na autorização de rotas
- Estruturar o código com **entidades, casos de uso e módulos isolados**
- Aprender com profundidade, dividindo o fluxo em partes menores documentadas

## Funcionalidades previstas

- [x] CRUD de usuários
- [x] Registro de novos usuários
- [x] Autenticação com JWT
- [x] Autorização com RBAC
- [ ] Testes automatizados (Vitest)
- [ ] Documentação completa no diretório `docs/`

## Tecnologias

- NestJS
- PostgreSQL
- Docker
- JWT
- Zod
- Vitest
- GitHub Actions (lint, test, build)

## Documentação em progresso

Todo o passo a passo técnico está sendo registrado no diretório `docs/`, incluindo:

- Estratégia JWT sem Passport
- Configuração do `tsconfig.json`
- Integração com Vitest
- Ambiente com Docker + PostgreSQL
- Schemas e validações com Zod
- Setup de GitHub Actions para CI (lint, test, build)
