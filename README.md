# Nebula
A developer dashboard for apps and tools

## Requirements

- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/) installed
- Node.js 20+ if you prefer running the services outside of Docker

## Quick start with Docker

The easiest way to run Nebula is with Docker Compose which spins up Postgres, the API server and the Angular front‑end. Everything can be built and started with a single command:

```bash
docker-compose up --build
```

Alternatively you can run the provided helper script:

```bash
./start.sh
```

Once the services are running, open [http://localhost:4200](http://localhost:4200) in your browser. The API will be available on [http://localhost:3000](http://localhost:3000).

Environment variables for the backend are defined in `backend/.env.example`. You can create your own `backend/.env` file with the same keys to override the defaults.

To stop the stack press `Ctrl+C` and then run:

```bash
docker-compose down
```

## Running without Docker

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm start
```
