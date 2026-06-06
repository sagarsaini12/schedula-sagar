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

<<<<<<< HEAD
### 5. Open Swagger UI
Visit: http://localhost:3000/api
=======
#Screenshot
<img width="1196" height="1315" alt="Schedula_ erd" src="https://github.com/user-attachments/assets/f1dec6d4-1508-4995-b21c-3d57465ee60b" />
<img width="1538" height="1010" alt="Screenshot 2026-06-04 164302" src="https://github.com/user-attachments/assets/ac56659b-38d2-4a58-8d23-9486b4c8bccc" />
<img width="1806" height="930" alt="Screenshot 2026-06-04 164414" src="https://github.com/user-attachments/assets/a8e7b597-262d-4097-b5c6-9c15f0e7073b" />
<img width="1742" height="718" alt="Screenshot 2026-06-06 154927" src="https://github.com/user-attachments/assets/1d538691-9389-4ab3-9a41-1c4b0f82ec53" />
<img width="1735" height="751" alt="Screenshot 2026-06-06 151912" src="https://github.com/user-attachments/assets/4d5c90e6-19f3-4408-bc55-1dfc4df4b91f" />


>>>>>>> 469ab1e0e59786a746aa065b0ffa161b46d06f81

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
