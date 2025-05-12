# 💰 WealthWise - Personal Finance & Investment Tracker

**WealthWise** is a full-stack finance dashboard application built to help users track their expenses, view analytics, and monitor their investments in cryptocurrencies and stocks (ongoing).

This is a passion project aimed at exploring **monolith to microservices architecture**, **token management**, and **real-time data integration** with financial APIs.

---

## 🏗️ Project Structure

The application is split into the following components:

### 1. Main App (Monolith)
- Built with React (Frontend)
- Handles routing, authentication, and main dashboard UI
- Manages transactions, wallets, user profiles

### 2. `crypto-service` (Microservice)
- Built as a separate backend service
- Fetches live crypto prices
- Allows users to track/watch specific cryptocurrencies

### 3. `stock-service` (Planned Microservice)
- Will fetch and display stock data (basic dashboard first)
- Will eventually support watchlists and price tracking

---

## ⚙️ Tech Stack

- **Frontend**: React.js, Tailwind CSS, Chart.js
- **Backend**: Node.js, Express, MongoDB (Mongoose)
- **Authentication**: JWT (JSON Web Tokens), cookies (planned for secure token handling)
- **Architecture**: Microservices (WIP), REST APIs
- **Deployment**: GitHub (development), planned deployment on Render/Netlify

---

## ✅ Features Completed So Far

### 🔹 Main Dashboard
- User registration & login
- JWT-based authentication
- Transactions list (CRUD)
- Wallet tracking
- Stats, charts & expense analytics

### 🔹 Crypto Dashboard (Microservice)
- Live crypto market prices via external API
- Individual coin page
- Watchlist (planned)
- Token integration with main app (WIP)

### 🔹 Stock Dashboard (Microservice)
- Live crypto market prices via external API
- Search any symbol

For now, integrated both the services using iframes ,
- doing a micro-frontend and micro-services architecture

---

## 🐞 Challenges Faced

- 🎯 **Token management** across microservices (main → crypto)
- 🍪 Choosing between cookies vs headers for secure token passing
- 🧩 Routing issues when handling paths between services
- 🔁 Syncing UI across isolated services
- 🤹 Balancing frontend/backend dev while learning microservice architecture

---

## 🚀 What’s Next?

- ✅ Integrate `crypto-service` fully with main app using secure cookies
- 🔜 Build basic `stock-service` dashboard (live stock prices, charting)
- 🔐 Handle token sharing between main and stock dashboards
- 📈 Add stock and crypto watchlist tracking (with MongoDB per user)
- 🧪 Final testing & deployment

---

## 📦 License

This project is **not open source**.  
All rights reserved to the author.  
**Please do not copy, reuse, or modify this code without explicit permission.**
> 🛡️ For portfolio and learning purposes only.

---

## 🙌 Author

Built by Harika
Fueled by late-night debugging, coffee ☕, and relentless curiosity.

