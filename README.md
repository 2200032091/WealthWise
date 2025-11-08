# WealthWise – Personal Finance & Investment Tracker

WealthWise is a full-stack finance dashboard built to help users manage expenses, monitor crypto and stock investments, and analyze their financial growth — powered by a microservices architecture.


---

## Project Overview

![system-architect](https://github.com/2200032091/WealthWise/blob/main/assets/architecture.png)



Started as a monolithic app and evolved into a distributed microservices-based system, deployed on AWS EC2 with Nginx reverse proxy, SSL (Certbot), and domain via Cloudflare DNS.

## Architecture Highlights

- API Gateway routes traffic securely to all backend microservices.
- Main Server → Authentication, transactions, and analytics.
- Crypto Service → Live crypto prices, personal watchlist.
- Stock Service → Real-time stock data, personal watchlist.
- Frontend deployed and served over HTTPS via Nginx proxy.

---

## Tech Stack

- **Frontend:** React.js, Tailwind CSS, Chart.js  
- **Backend:** Node.js, Express, MongoDB Atlas  
- **Auth:** JWT-based token authentication
- **Infra:** Docker, Nginx, AWS EC2, Cloudflare DNS, Certbot SSL
- **APIs:** Real-time data from financial APIs  
- **Architecture:** Microservices + API Gateway
- **Version Control:** Git and GitHub
- **Upcoming:** Redis caching, GitHub Actions automation

---

## Key Features

- Secure authentication & authorization using JWT
- Expense tracking with CRUD operations
- Wallet dashboard with categorized insights
- Live crypto & stock dashboards
- Personalized user watchlists (crypto + stock)
- End-to-end HTTPS deployment
- Scalable modular microservices structure

---

## What I Learned

- Setting up and deploying a real microservices architecture
- Managing reverse proxy and SSL for multiple subdomains
- Optimizing Docker workflows for production
- Configuring Cloudflare + Nginx for security and routing
- Structuring large-scale full-stack apps for modularity

---

## License

This project is **not open source**.  
> Built for learning, showcasing skills, and pure curiosity.

By Harika✨

---
