# Event Ticketing System

This is an **Event Ticketing System** built with **NestJS** for the backend and **Expo (React Native)** for the frontend.

## 📌 Features
- User authentication & authorization
- Event creation & management
- Ticket purchasing & QR code generation
- Payment integration
- Push notifications

---

## 🛠️ Technologies Used

### **Backend (NestJS + TypeORM)**
- **NestJS** (`@nestjs/common`, `@nestjs/core`, `@nestjs/graphql`, `@nestjs/typeorm`)
- **GraphQL** (`@nestjs/apollo`, `apollo-server-express`, `graphql`)
- **TypeORM** (`typeorm` with SQLite)
- **Authentication** (JWT, Passport)
- **Database** (SQLite, PostgreSQL support available)

### **Frontend (Expo + React Native)**
- **Expo (SDK 48.0.0)**
- **React Native**
- **React Navigation** (for screen routing)
- **GraphQL Apollo Client** (for API integration)
- **Redux Toolkit** (for state management)
- **Axios** (for HTTP requests)
- **Expo Notifications** (for push notifications)

---

## 📂 Project Structure
```
📦 event-ticketing-system
 ├── backend/                # NestJS Backend
 │   ├── src/
 │   ├── test/
 │   ├── package.json
 │   ├── tsconfig.json
 │   ├── .env
 │   ├── README.md
 │
 ├── frontend/               # Expo React Native Frontend
 │   ├── src/
 │   ├── assets/
 │   ├── App.js
 │   ├── package.json
 │   ├── app.json
 │   ├── .env
 │   ├── README.md
```

---

## 🚀 Backend Setup (NestJS)
### 1️⃣ Install dependencies
```bash
cd backend
npm install
```
### 2️⃣ Set up environment variables
Create a **.env** file in the `backend/` folder and add:
```env
PORT=3000
DATABASE_URL=sqlite://event-ticketing.db
JWT_SECRET=your-secret-key
```

### 3️⃣ Run the backend server
```bash
npm run start:dev
```
By default, the backend runs on **http://localhost:3000**.

---

## 📱 Frontend Setup (Expo)
### 1️⃣ Install dependencies
```bash
cd frontend
npm install
```

### 2️⃣ Set up environment variables
Create a **.env** file in the `frontend/` folder and add:
```env
API_URL=http://localhost:3000/graphql
EXPO_PUBLIC_API_URL=http://localhost:3000
```

### 3️⃣ Start the Expo development server
```bash
npm start
```
Now, scan the QR code from the terminal with **Expo Go** on your phone to open the app.

#### 📌 Running on Emulator/Simulator
- Android: `npm run android`
- iOS (Mac only): `npm run ios`
- Web: `npm run web`

---

## 🛠️ Useful Commands
| Task | Backend (NestJS) | Frontend (React Native) |
|------|-----------------|-----------------|
| Install dependencies | `npm install` | `npm install` |
| Run development server | `npm run start:dev` | `npm start` |
| Run tests | `npm run test` | `npm test` |
| Build production | `npm run build` | `npm run build` |

---

## ✅ TODOs
- [ ] Implement payment gateway (Stripe)
- [ ] Add offline support for mobile
- [ ] Improve UI/UX design

---

## 📝 License
This project is licensed under the **MIT License**.

---

## 💡 Contributing
Feel free to fork this repository and contribute via pull requests! 🎉

