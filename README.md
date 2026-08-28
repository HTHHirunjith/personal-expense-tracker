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

PostgreSQL is required. Create a database for the application (for example `expense_tracker`).

All secrets and environment-specific values are **externalized to environment variables**. No real credentials are committed to the repository.

### Environment Variables

The backend reads the following environment variables. Only the two marked **REQUIRED** are mandatory.

| Variable | Required | Default | Description |
| --- | --- | --- | --- |
| `DB_HOST` | no | `localhost` | PostgreSQL host |
| `DB_PORT` | no | `5432` | PostgreSQL port |
| `DB_NAME` | no | `expense_tracker` | Database name |
| `DB_USERNAME` | no | `postgres` | Database user |
| `DB_PASSWORD` | **REQUIRED** | — | Database password |
| `JWT_SECRET` | **REQUIRED** | — | JWT signing secret (min 32 chars) |
| `CORS_ALLOWED_ORIGINS` | no | `http://localhost:5173` | Allowed frontend origin |

On Windows (PowerShell), set the required variables **in the same terminal** you will use to start the backend. `mvn spring-boot:run` must inherit them, so run these before Maven in that window:

```powershell
# Run in the SAME PowerShell window that will launch `mvn spring-boot:run`
$env:DB_PASSWORD = "your_database_password"
$env:JWT_SECRET = "a_long_random_secret_of_at_least_32_characters"
$env:CORS_ALLOWED_ORIGINS = "http://localhost:5173"
```

After setting them, start the backend in that same window. The variables must exist in the same process tree as Maven; opening a new terminal does not inherit them.

To make them persistent for all **future** terminals, use `setx` (or the "Edit environment variables" dialog). Note that `setx` affects only newly started terminals — it does **not** apply to the terminal that is already open. Restart the terminal after running `setx`:

```powershell
setx DB_PASSWORD "your_database_password"
setx JWT_SECRET "a_long_random_secret_of_at_least_32_characters"
setx CORS_ALLOWED_ORIGINS "http://localhost:5173"
```

If the backend fails to start with `Could not resolve placeholder 'JWT_SECRET'`, the variable is not reaching the Spring JVM — set it with `$env:JWT_SECRET` in the same terminal that launches Maven (or restart the terminal after `setx`) and retry.

A tracked template with placeholders is provided at:

`server/src/main/resources/application.properties.example`

Copy it to `server/src/main/resources/application.properties` (which is git-ignored) if you need to adjust non-environment settings. The secrets themselves always come from the environment variables above.

### Running the Backend

1. Navigate to the `server` directory:

   ```bash
   cd server
   ```

2. Make sure the required environment variables (`DB_PASSWORD`, `JWT_SECRET`) are set.

3. Start the Spring Boot application:

   ```bash
   mvn spring-boot:run
   ```

   If Maven is not on your PATH, use the wrapper instead:

   ```bash
   .\mvnw.cmd spring-boot:run
   ```

The backend will be available at `http://localhost:8080`. If `JWT_SECRET` is missing or too short, the application refuses to start and prints a clear error.

### Running the Frontend

1. Navigate to the `client` directory:

   ```bash
   cd client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. (Optional) Configure the backend API URL. Copy `client/.env.example` to `client/.env.local` and set `VITE_API_BASE_URL` if your backend is not at the default `http://localhost:8080/api/v1`. This file is git-ignored.

4. Start the Vite development server:

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

