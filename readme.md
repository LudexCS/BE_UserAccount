# 👤 Ludex UserAccount Service

This repository provides user account management features for the Ludex platform.

---

## 📌 Description

Handles user registration, email verification, authentication, and account data retrieval. It operates as one of the core microservices supporting secure identity and session management.

---

## 🔧 Responsibilities

- User registration and input validation
- Sending and verifying email authentication codes
- Login and logout via access and refresh tokens
- JWT-based session handling with secure cookies
- Retrieving authenticated user information

---

## 📦 Endpoint Structure

- `POST /api/register` - Register a new user
- `POST /api/validation/email` - Send email verification code
- `POST /api/auth/login` - Login and receive tokens
- `POST /api/auth/logout` - Logout user and invalidate tokens
- `POST /api/auth/reissue` - Reissue tokens using refresh token
- `GET /api/protected/account/get` - Fetch current user account details

---

## 🛠 Folder Structure

```
src/
  ├── route/             # API route definitions
  ├── middleware/        # JWT guard and custom middleware
  ├── controller/        # Request handling logic
  ├── service/           # Core business logic
  ├── dto/               # Data validation schemas
  └── util/              # Email service, token utilities
```

---

## 🛡 Security

- JWT-based authentication (access and refresh tokens)
- HttpOnly, Secure cookie handling
- CORS configured with credential sharing
- Email verification step before registration is finalized

---

## ⚙️ Tech Stack

- Node.js + TypeScript
- Express.js
- class-validator + class-transformer
- cookie-parser, jsonwebtoken
- nodemailer (for email delivery)

---

## 🚀 Run Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables in `.env`

3. Start the server:
   ```bash
   npm run start:dev
   ```

---

© 2025 Ludex. All rights reserved.