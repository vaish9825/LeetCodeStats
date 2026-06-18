# LeetCodeStats Dashboard

A full-stack web dashboard that fetches and visualizes real-time LeetCode profile statistics using the official LeetCode GraphQL API. The application uses a custom Vercel Serverless backend with Upstash Redis caching to securely proxy requests, reduce redundant API calls, and improve response times.

**Live Demo:** https://leet-code-stats-two.vercel.app

---

## Features

* Search any LeetCode username and view real-time coding statistics
* Custom Vercel Serverless API to securely bypass browser CORS restrictions
* **Upstash Redis caching (30-minute TTL)** for faster repeated searches and reduced GraphQL API requests
* Responsive design optimized for desktop and mobile devices

---

## Tech Stack

### Frontend

* HTML5
* CSS3
* Vanilla JavaScript

### Backend

* Node.js
* Vercel Serverless Functions

### Cache

* Upstash Redis

### API

* LeetCode GraphQL API

---

## Architecture

The application follows a cache-first serverless architecture.

```
Browser
    │
    ▼
Frontend (HTML/CSS/JavaScript)
    │
    ▼
Vercel Serverless Function
    │
 ┌──┴──────────┐
 │             │
 │  Redis      │
 │  (Cache)    │
 └──┬──────────┘
    │
Cache Miss
    │
    ▼
LeetCode GraphQL API
    │
    ▼
Response cached for 30 minutes
    │
    ▼
Frontend
```
---

## Local Development

### Prerequisites

* Node.js
* Git
* Vercel CLI
* Upstash Redis account

---

### Installation

```bash
# Clone the repository
git clone https://github.com/vaish9825/LeetCodeStats.git

# Navigate into the project
cd LeetCodeStats

# Install dependencies
npm install

# Install Vercel CLI (if not already installed)
npm install -g vercel

# Link the project
vercel link
```

---

### Environment Variables

Create a `.env.local` file in the project root.

```env
UPSTASH_REDIS_REST_URL=YOUR_UPSTASH_REDIS_REST_URL
UPSTASH_REDIS_REST_TOKEN=YOUR_UPSTASH_REDIS_REST_TOKEN
```

---

### Run the Project

```bash
vercel dev
```

The application will be available at:

```
http://localhost:3000
```

---
