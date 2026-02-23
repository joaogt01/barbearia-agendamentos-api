# Barbearia Agendamentos

Sistema completo de agendamento para barbearias, com **API em Spring Boot** e **frontend em React + Vite**.

Permite que clientes agendem serviços, e administradores gerenciem horários, serviços e usuários.

---

## 🚀 Tecnologias utilizadas

### 🔧 Backend
- Java 17+
- Spring Boot
- Spring Data JPA
- Spring Security (JWT)
- PostgreSQL
- Maven

### 🎨 Frontend
- React
- Vite
- TypeScript
- Axios
- React Router DOM

---

## 📌 Funcionalidades

### Cliente
- Cadastro e login
- Visualizar serviços disponíveis
- Agendar horário
- Ver seus agendamentos

### Administrador
- Dashboard administrativo
- CRUD de serviços
- Gerenciamento de usuários
- Visualização de todos os agendamentos

---

## Como rodar o projeto

### 🔹 Backend (Spring Boot)

1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/barbearia-agendamentos-api.git
```

Configure o application.properties:

```bash
spring.datasource.url=jdbc:postgresql://localhost:5432/barbearia
spring.datasource.username=postgres
spring.datasource.password=senha
spring.jpa.hibernate.ddl-auto=update
```

Rode o projeto:
```bash
./mvnw spring-boot:run
```

Backend disponível em:
```bash 
http://localhost:8080
```

🔹 Frontend (React + Vite)

Acesse a pasta do frontend:

```bash
cd frontend
```

Instale as dependências:

```bash 
npm install
```

Rode o projeto:

```bash
npm run dev
```
Frontend disponível em:
```bash
 http://localhost:5173
```

🔐 Autenticação

O sistema utiliza JWT:

Após o login, o token é salvo no localStorage

Rotas protegidas usam o PrivateRoute

O token é enviado automaticamente via Axios

📌 Rotas principais

Backend

 Método |	Rota |	Descrição|
 |---------|-----------|-------------|
POST	 | /auth/login |	Login
POST	| /auth/register |	Cadastro
GET	| /services	Listar | serviços
POST |	/appointments | Criar agendamento
GET |	/appointments	| Listar agendamentos

Frontend

 Rota |	Acesso|
|---------|-----------|
 /login |	Público 
/register	| Público
/dashboard	| Usuário logado
/admin	| Admin
/client |	Cliente


---

Este projeto foi desenvolvido para praticar:

Arquitetura em camadas (Controller → Service → Repository)

Autenticação com JWT

Integração entre Spring Boot e React

Proteção de rotas no frontend
Boas praticas com TypeScript
