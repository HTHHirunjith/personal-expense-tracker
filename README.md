# Expense Tracker App

**Expense Tracker App** is a full-stack personal finance management application. It lets users register and log in, add and categorize income and expense transactions, and view their financial activity through tables and interactive charts.

The frontend is built with React and the backend with Java + Spring Boot. PostgreSQL is used for persistence, and authentication is handled with JWT.

---

## Features

* JWT-based registration and login
* Create, edit, and delete transactions
* Filter transactions by date
* Create and manage categories
* Visualize spending with bar charts (Recharts)
* Monthly financial report via the API
* Swagger UI API documentation

---

## Tech Stack

### Frontend

* React (TypeScript, Vite)
* TailwindCSS
* Zustand (state management)
* Axios
* React Router DOM
* Recharts (data visualization)

### Backend

* Java 17 + Spring Boot
* Spring Security (JWT authentication)
* Spring Data JPA
* Lombok
* Swagger / springdoc (API documentation)

### Database

* PostgreSQL

---

## Getting Started

These instructions assume a local development setup on Windows.

### Prerequisites

* Node.js and npm
* Java 17
* Maven (or use the included `mvnw` wrapper)
* PostgreSQL

### Database Setup

PostgreSQL is required. Create a database for the application.

The local database configuration lives in the git-ignored file:

`server/src/main/resources/application.properties`

Edit that file to set the connection URL, username, and password for your local PostgreSQL instance. The values in this file are local-only and are not committed to the repository.

### Running the Backend

1. Navigate to the `server` directory:

   ```bash
   cd server
   ```

2. Start the Spring Boot application:

   ```bash
   mvn spring-boot:run
   ```

   If Maven is not on your PATH, use the wrapper instead:

   ```bash
   .\mvnw.cmd spring-boot:run
   ```

The backend will be available at `http://localhost:8080`.

### Running the Frontend

1. Navigate to the `client` directory:

   ```bash
   cd client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the Vite development server:

   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`. The frontend calls the backend at `http://localhost:8080/api/v1`.

---

## Project Structure

```
expense-tracker-app/
|-- client     # React frontend (Vite, TypeScript, TailwindCSS)
`-- server     # Spring Boot backend (Java 17, Spring Security, JPA)
```

---

## API

The backend exposes the following endpoints under the `/api/v1/` prefix.

### Authentication

* `POST /api/v1/auth/register`
* `POST /api/v1/auth/login`

### Users

* `GET /api/v1/users`
* `GET /api/v1/users/{email}/me`
* `PUT /api/v1/users/{id}/update`
* `DELETE /api/v1/users/{id}/delete`

### Transactions

* `GET /api/v1/transactions` (supports `startDate` and `endDate` query parameters)
* `POST /api/v1/transactions`
* `GET /api/v1/transactions/{id}`
* `PUT /api/v1/transactions/{id}`
* `DELETE /api/v1/transactions/{id}`

### Categories

* `GET /api/v1/categories`
* `POST /api/v1/categories`
* `GET /api/v1/categories/{id}`
* `PUT /api/v1/categories/{id}`
* `DELETE /api/v1/categories/{id}`

### Reports

* `GET /api/v1/reports/monthly`

Swagger UI is available at `http://localhost:8080/swagger-ui/index.html`.

---

## Testing

The backend includes a basic Spring Boot test (`ServerApplicationTests`) that verifies the application context loads. Broader unit and integration tests are planned but not yet implemented.

