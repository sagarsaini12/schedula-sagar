# Schedula - Role-Based Authentication API

## Tech Stack
- NestJS + TypeScript
- PostgreSQL + TypeORM
- JWT Authentication (Passport JWT)
- bcrypt
- Swagger

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Create PostgreSQL database
```sql
CREATE DATABASE schedula;
```

### 3. Update database password
Edit `src/app.module.ts` and set your PostgreSQL password.

### 4. Run the app
```bash
npm run start:dev
```

### 5. Open Swagger UI
Visit: http://localhost:3000/api

## API Endpoints

| Method | URL | Auth | Role |
|--------|-----|------|------|
| POST | /auth/signup | None | - |
| POST | /auth/login | None | - |
| GET | /doctor/profile | Bearer JWT | DOCTOR only |
| GET | /patient/profile | Bearer JWT | PATIENT only |

## Testing
1. POST /auth/signup with role "DOCTOR" or "PATIENT"
2. POST /auth/login to get access_token
3. Use token as Bearer in Authorization header
4. Access /doctor/profile (DOCTOR only) or /patient/profile (PATIENT only)
