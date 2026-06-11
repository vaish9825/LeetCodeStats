# LeetCodeStats Dashboard

A full-stack web dashboard that fetches and visualizes real-time LeetCode profile statistics using the LeetCode GraphQL API and a custom Vercel Serverless backend.

**Live Demo:** [https://leet-code-stats-two.vercel.app](https://leet-code-stats-two.vercel.app) 

## Features

* Search any LeetCode username for real-time coding statistics and submission metrics
* Animated circular progress bars for Easy, Medium, and Hard problems along with dynamic stat cards with responsive UI
* **Custom API Proxy** to securely bypass browser CORS restrictions
* Smooth and clean user experience

## Tech Stack

* **Frontend:** HTML5, CSS3, Vanilla JavaScript
* **Backend:** Vercel Serverless Functions (Node.js)
* **Data Integration:** LeetCode GraphQL API

## How It Works

To ensure security and bypass strict browser CORS policies, this application uses a proxy architecture:
1. The user enters a LeetCode username on the frontend.
2. The frontend sends a request to our custom Vercel Serverless backend route (`/api/leetcode`).
3. The backend securely communicates with the official LeetCode GraphQL API, retrieves the data, and passes it back to the client.
4. The response data is processed and displayed dynamically through progress indicators and metric cards.

## Local Development

 You must run a local server using the Vercel CLI.

### Prerequisites
* [Node.js](https://nodejs.org/) installed on your machine
* Git installed on your machine

### Quick Start

Run the following commands in your terminal to set up and start the project locally:

```bash
# 1. Clone the repository
git clone [https://github.com/vaish9825/LeetCodeStats.git](https://github.com/vaish9825/LeetCodeStats.git)

# 2. Navigate into the project directory
cd LeetCodeStats

# 3. Install the Vercel CLI globally (if you haven't already)
npm install -g vercel

# 4. Link the project to your Vercel account (follow the prompts)
vercel link

# 5. Start the local development server
vercel dev
