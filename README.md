# WealthWise - Personal Finance & Investment Tracker

WealthWise is a full-stack finance dashboard application built to help users track their expenses, view analytics, and monitor their investments in cryptocurrencies and stocks (ongoing).

> This is a passion project aimed at exploring monolith to microservices architecture, token management, and real-time data integration with financial APIs.

---

##  Project Structure

The application is split into the following components:

1. **Main App (Monolith)**
   - Built with React (Frontend)
   - Handles routing, authentication, and main dashboard UI
   - Manages transactions, wallets, user profiles

2. **crypto-service (Microservice)**
   - Built as a separate backend service
   - Fetches live crypto prices
   - Allows users to track/watch specific cryptocurrencies

3. **stock-service (Microservice)**
   - Fetches and displays stock data (basic dashboard first)
   - Supports watchlists
   - Eventually supports price tracking

---

## ⚙️ Tech Stack

- **Frontend:** React.js, Tailwind CSS, Chart.js  
- **Backend:** Node.js, Express, MongoDB Atlas (Mongoose)  
- **Authentication:** JWT (JSON Web Tokens), cookies (planned for secure token handling)  
- **Architecture:** Microservices (WIP), REST APIs  
- **Deployment:** GitHub (development), planned deployment on Render/Netlify


---

## ✅ Features Completed So Far

### Main Dashboard
- User registration & login  
- JWT-based authentication  
- Transactions list (CRUD)  
- Wallet tracking  
- Stats, charts & expense analytics  
- Unified “Markets” Tab  (Combines Crypto + Stock watchlists, and asset search.)

### Crypto Dashboard (Microservice)
- Live crypto market prices via external API  
- Individual coin page  
- Watchlist  
- Token integration with main app  
 
### Stock Dashboard (Microservice)
- Live stock market prices via external API  
- Search any symbol  
- Watchlist  
- Token integration with main app  

  
---

## 🐞 Challenges Faced

- 🎯 **Token Management Across Microservices**  
  Managing secure token passing between the main app and services like the crypto service — deciding between headers and cookies for authentication.

- 🍪 **Choosing Cookies vs Headers**  
  Weighing the pros and cons of using cookies versus authorization headers for secure, cross-service communication.

- 🧩 **Routing and Middleware Order in Express**  
  Understanding the importance of route and middleware order in Express to ensure requests correctly reach their intended microservice endpoints. Incorrect ordering caused certain routes, like `/stocks/watchlist`, to never trigger.

- 🔁 **Syncing UI State Across Isolated Services**  
  Coordinating frontend components that belong to separate micro-frontends while maintaining a consistent user experience.

- 🤹 **Balancing Frontend and Backend Development**  
  Managing learning curves and workload across both frontend micro-frontends and backend microservices.

- 🧠 **Learning Express Route Hierarchy**  
  Grasping how Express processes middleware and routes in sequence, which was key to fixing routing conflicts and ensuring requests hit the correct handlers.

- 🔄 **Implementing Caching to Reduce Third-Party API Load**  
  To avoid hitting strict rate limits of external APIs (like Alpha Vantage), caching responses was implemented. This reduces redundant calls, improves performance, and ensures data availability during rate limit windows.


---

## 🚀 What’s Next?

- **Charts & Market Data**  
  - Implement line/candlestick charts using Chart.js or TradingView  
  - Enable auto-refresh or real-time market price updates  
  - Add search and filtering for assets

- **Authentication & Security**  
  - 🍪 Switch to HTTP-only cookies for enhanced production security  
  - 🔁 Add refresh token support  
  - ⛔ Handle token expiry and auto-refresh on frontend

- **Budget Goals & Alerts**  
  - Allow users to set monthly budget limits  
  - Track spending vs budget with UI warnings  
  - 📧 Optional email alerts via Nodemailer

- **Investment Growth Estimator**  
  - User inputs: lump sum, SIP, and rate of return  
  - Output: growth charts using compound interest formula

- **Transaction Export**  
  - “Download Report” option in wallets  
  - Export as PDF (via jsPDF) or CSV (via csv-writer)  
  - Filters: date range, category, wallet

- **Smart Category Detection**  
  - Regex-based auto-tagging  
  - Future: lightweight ML model + manual override UI

- **Currency Conversion**  
  - Support USD, INR, EUR  
  - Fetch FX rates via ExchangeRate API or OpenExchangeRates  
  - Convert balances and charts dynamically

- **Expense Insights**  
  - Show month-over-month spending comparisons  
  - Highlight top categories and trends with charts

- **Testing & Deployment**  
  - Finalize unit/integration tests  
  - Prepare for production deployment (Docker, hosting, logging)

---

##  License


This project is **not open source**.  
All rights reserved to the author.  

> 🛡️ For portfolio and learning purposes only.

---

## 🙌 Author

Built by Harika
Fueled by late-night debugging, coffee ☕, and relentless curiosity..

