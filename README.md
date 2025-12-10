# WealthWise – Personal Finance & Investment Tracker

WealthWise is a full-stack finance dashboard built to help users manage expenses, monitor crypto and stock investments, and analyze their financial growth — powered by a microservices architecture.


---

## Project Overview

![system-architect](https://github.com/2200032091/WealthWise/blob/main/assets/architecture.png)



Started as a monolithic app and evolved into a distributed microservices-based system, deployed on AWS EC2 with Nginx reverse proxy, SSL (Certbot), and domain via Cloudflare DNS.

## High-level Architecture

**Frontend & Routing**

- `wealthwise.gh-18.com` → Cloudflare  
  - Cloudflare **Worker** intercepts all requests  
  - Health-checks backend → decides:
    - **Live mode** → route to EC2 (origin)  
    - **Fallback mode** → serve static maintenance page (Cloudflare Pages)

**Backend & Services (on EC2 using Docker)**

- `wealthwise-client` – React frontend (served by Nginx)
- `wealthwise-server` – main backend (auth, transactions, analytics)
- `api-gateway` – central entrypoint for microservices
- `crypto-service` – crypto-specific APIs & watchlist
- `stock-service` – stock-specific APIs & watchlist
- MongoDB Atlas – persistent storage for users, transactions, and watchlists

**Networking**

- Nginx reverse proxy terminates HTTPS and routes traffic to Docker containers  
- Docker Compose orchestrates core services  
- Additional services run as separate containers with their own Dockerfiles  
- Cloudflare handles DNS, SSL (via proxy), and edge logic

---

## Architecture Highlights

- **Microservices-based backend**  
  - Main server for auth & core finance logic  
  - Separate crypto & stock services  
  - API Gateway for clean external API surface

- **Edge-aware routing & reliability**  
  - Cloudflare Worker in front of `wealthwise.gh-18.com`  
  - Worker checks `server.wealthwise.gh-18.com/health`  
  - If EC2 is healthy → route to live app  
  - If EC2 is down / stopped → route to fallback page hosted on Cloudflare Pages  

- **Cost-optimized deployment**  
  - EC2 can be safely turned off to save cost  
  - Recruiters/users still see a branded maintenance page instead of a broken site

- **Secure multi-domain setup**  
  - `wealthwise.gh-18.com` → main app (through Worker)  
  - `fallback-wealthwise.pages.dev` / `fallback.gh-18.com` → fallback site

---

## Tech Stack

**Frontend**

- React.js  
- Tailwind CSS  
- Chart.js (data visualizations)  
- Nginx (serving optimized production build)

**Backend**

- Node.js, Express  
- Microservices pattern (main server, crypto-service, stock-service, API Gateway)  
- REST APIs for all operations  
- JWT-based authentication & authorization

**Database**

- MongoDB Atlas  
- Separate collections for users, transactions, crypto watchlist, stock watchlist

**Infrastructure / DevOps**

- Docker & Docker Compose  
- Nginx reverse proxy  
- AWS EC2 (t3.medium)  
- Cloudflare DNS, proxy, and **Workers**  
- Cloudflare Pages for static fallback  
- Certbot SSL (where applicable)

**Architecture Concepts**

- Microservices + API Gateway  
- Reverse proxy & SSL termination  
- Health checks & fallback routing  
- Edge computing via Cloudflare Worker  
- Planned: GitHub Actions CI/CD, Redis caching

---

## Core Features

### Authentication & User Management

- User registration & login  
- JWT-based authentication  
- Protected routes

### Personal Finance & Transactions

- Add / edit / delete transactions  
- Categorization (e.g., Food, Rent, Shopping)  
- Filter & view over time  
- Dashboard with:
  - Total income / expense  
  - Category breakdowns  
  - Time-series charts (e.g., monthly trends)

### Crypto Module

- Crypto dashboard (price data from external APIs)  
- Add/remove coins to personal watchlist  
- View coin details and current price

### Stock Module

- Stock search & watchlist  
- Persisted stock symbols per user  
- Ready for future integration with stock price APIs and predictions

### Reliability & Fallback (Phase 2)

- **Cloudflare Worker** checks backend `/health` endpoint  
- Decision cached for short TTL (e.g., 30 seconds)  
- If EC2 down → instantly serve a professional maintenance page from Cloudflare Pages  

---

## Reliability & Cloudflare Worker Design

The Worker uses this logic:

1. Request hits: `wealthwise.gh-18.com/*`
2. Worker checks cache:
   - If recent: reuse decision (live vs fallback)
   - If not: `fetch("https://server.wealthwise.gh-18.com/health")`
3. If `health.ok` → proxy request to `origin`
4. Else → serve fallback page from Cloudflare Pages

This provides:

- **Zero-downtime UX** for visitors  
- **Cost control**: EC2 can be stopped when not needed  
- **Edge-level logic**: runs on Cloudflare’s global network

---

## Upcoming (Phase 3):

- **GitHub Actions CI/CD**
- **Automatic deploy on push to main**
- **Health-check & rollback strategy**

---

## What I Learned

- Designing and implementing a microservices architecture from scratch
- Using Docker & Docker Compose to orchestrate multiple services
- Configuring Nginx as a reverse proxy with SSL and path-based routing
- Setting up Cloudflare DNS + Workers + Pages for reliability and cost-optimization
- Implementing a health-check-based fallback system
- Handling CORS, JWT auth, and multi-domain setups
- Debugging complex deployments across Docker, Nginx, Cloudflare, and EC2
- Thinking like a production engineer: reliability, scalability, cost, and maintainability

---

## Roadmap / Future Work
 
- GitHub Actions CI/CD: build, SSH deploy, restart containers
- Redis caching layer for frequently accessed data
- Investment growth projections (basic ML models)
- Notification system (email or in-app alerts)
- Improved observability (centralized logs, metrics, health dashboards)
- Role-based access control (RBAC)
- Kubernetes or ECS migration for advanced scaling

--- 

## License

This project is **not open source**.  
> Built for learning, showcasing skills, and pure curiosity.


By Harika✨

---
