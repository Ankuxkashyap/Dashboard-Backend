# Backend – Dashboard API

This is the backend API for the **Dashboard Web App**, built to support authentication, user management, and CRUD operations for the frontend application.

---

## 🌐 Live API
👉 **Backend Live URL:**  
https://dashboard-backend-qaej.onrender.com

---

## 🚀 Tech Stack
- **Node.js**
- **Express.js**
- **MongoDB** (Mongoose)
- **JWT** for authentication
- **bcrypt** for password hashing
- **CORS** for secure cross-origin communication

---

## ✨ Features
- User registration and login
- JWT-based authentication (HTTP-only cookies)
- Protected routes using authentication middleware
- User profile fetching
- CRUD operations on a sample entity (posts/tasks/notes)
- Secure password hashing
- Centralized error handling

---

## 🔐 Authentication Flow
- JWT is generated on successful login/register
- Token is stored in **HTTP-only cookies**
- Authentication middleware validates the token on protected routes
- Logout clears the authentication cookie

---

## 🌐 CORS & Security
- Configured to allow requests only from the frontend domain
- Credentials enabled for secure cookie transfer
- Passwords are securely hashed using bcrypt

---

## ⚙️ Environment Setup

Create a `.env` file in the root of the backend project:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=https://dashboard-frontend-iota-ten.vercel.app
