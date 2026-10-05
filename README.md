# NammaServe

NammaServe is a Chennai-focused home services marketplace. Customers can browse local professionals, compare services, request bookings, and manage service visits. Professionals can manage jobs, and administrators can review platform activity.

## Features

- Browse home services across 13 categories, including plumbing, electrical, cleaning, AC repair, and appliance repair.
- Search and filter professionals by category, area, price, rating, distance, and availability.
- View professional profiles with services, pricing, reviews, schedules, and portfolio items.
- Create bookings and choose a service location, date, and time.
- Use customer, professional, and administrator dashboards.
- Track booking status and request approval for additional charges.
- Manage reviews, complaints, invoices, and warranty information.
- Browse Chennai localities and switch between English and Tamil.

## Technology

- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **Backend:** Java 21, Spring Boot, Spring Security, Spring Data JPA
- **Authentication:** JWT
- **Development database:** H2 in-memory database
- **Production database:** PostgreSQL

## Project structure

```text
.
├── src/
│   ├── components/       # Pages, dashboards, modals, and shared UI
│   ├── context/          # Application and notification state
│   ├── data/             # Demo providers, categories, bookings, and locations
│   ├── services/         # Frontend API client
│   └── types/            # Frontend TypeScript types
├── backend/
│   ├── src/main/java/    # Spring Boot application
│   │   └── com/localfix/
│   │       ├── config/
│   │       ├── controller/
│   │       ├── dto/
│   │       ├── entity/
│   │       ├── repository/
│   │       ├── security/
│   │       └── service/
│   └── src/main/resources/
└── package.json
```

## Requirements

- Node.js and npm
- Java 21
- Maven

## Run locally

### 1. Start the backend

From the repository root:

```powershell
cd backend
mvn spring-boot:run
```

The backend listens on port `8080` by default. The local profile uses an in-memory H2 database, which is cleared when the backend restarts.

### 2. Start the frontend

In a second terminal, from the repository root:

```powershell
npm install
npm run dev
```

Vite prints the local address when it starts, usually `http://localhost:5173`.

The frontend API base defaults to `http://localhost:8080/api`. To use a different backend URL, create a root `.env` file:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

## Backend configuration

The local backend has defaults for development. For a production deployment, configure the following environment variables:

| Variable | Purpose |
|---|---|
| `SPRING_PROFILES_ACTIVE` | Set to `prod` to use the production profile |
| `LOCALFIX_JWT_SECRET` | JWT signing secret; use a strong secret of at least 64 characters |
| `LOCALFIX_JWT_EXPIRY_MS` | Token lifetime in milliseconds |
| `LOCALFIX_CORS_ORIGINS` | Comma-separated list of permitted frontend origins |
| `DB_HOST` | PostgreSQL host |
| `DB_PORT` | PostgreSQL port |
| `DB_NAME` | PostgreSQL database name |
| `DB_USER` | PostgreSQL username |
| `DB_PASSWORD` | PostgreSQL password |
| `PORT` | Backend listening port |

Do not use the development JWT secret or development database settings for a public deployment.

## API areas

The backend provides API endpoints for:

- Authentication and current-user information
- Service categories and service catalogue
- Technician listings, availability, and hyperlocal matching
- Bookings, job status, OTP completion, and additional charges
- Payments and invoices
- Reviews
- Complaints
- Warranty claims
- Administrator statistics and technician verification

Most API endpoints require a valid JWT. Public access is intended for sign-in, registration, catalogue browsing, technician browsing, and review browsing.

## Current implementation notes

Some parts of the application are demo-oriented:

- The frontend provider and category listings use local mock data.
- Booking creation and booking retrieval are connected to the backend; other screens and API clients may still use local browser state.
- The backend payment flow records a successful payment but does not connect to a payment gateway.
- The local H2 database is temporary. Use PostgreSQL for data that must survive restarts and deployments.
- Seed data is added when the database is empty.

## Build

Create a production frontend build with:

```powershell
npm run build
```

Preview the built frontend locally with:

```powershell
npm run preview
```

For backend packaging, run this from the `backend` directory:

```powershell
mvn package
```

## Deployment configuration

The repository includes `render.yaml` for Render and `vercel.json` for Vercel deployment configuration. Set production environment variables in the relevant hosting provider before deploying.
