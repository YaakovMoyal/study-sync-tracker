# Study Sync – Fullstack Learning Tracker

Repo: `study-sync-tracker`

A local-only fullstack web app for tracking study sessions / learning tasks,
built as a learning project across an 8-week program. **No deployment, no cloud,
no external services** — everything runs on your machine.

## Stack

| Layer    | Technology                                |
| -------- | ----------------------------------------- |
| Backend  | Node.js + Express + TypeScript            |
| Database | SQLite (via `better-sqlite3`)             |
| Frontend | React + TypeScript (Vite)                 |
| Config   | `dotenv` (local `.env` files)             |

> **Why `better-sqlite3`?** It's synchronous and zero-config, and it lets you
> write real SQL by hand — ideal for a project whose curriculum includes SQL and
> transactions. We stay consistent with it throughout.

## Project structure

```
study-sync-tracker/
├── backend/
│   ├── src/
│   │   ├── index.ts                  # Express server entry point
│   │   ├── config/
│   │   │   └── env.ts                # dotenv-based config (port, db path)
│   │   ├── controllers/
│   │   │   └── healthController.ts   # GET /health handler
│   │   ├── middleware/
│   │   │   └── errorHandler.ts       # notFound + error handlers
│   │   ├── models/
│   │   │   └── db.ts                 # SQLite connection + schema (users table)
│   │   └── routes/
│   │       └── health.ts             # /health router
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── main.tsx                  # React entry point
│   │   ├── App.tsx                   # Root component
│   │   ├── api/
│   │   │   └── client.ts             # API client (getHealth)
│   │   ├── components/
│   │   │   └── Header.tsx
│   │   └── pages/
│   │       └── HomePage.tsx          # "Check backend connection" button
│   ├── index.html
│   ├── .env.example
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── .gitignore
└── README.md
```

## Prerequisites

- Node.js 18+ (tested on Node 22)
- npm

## Running locally

Use **two terminals** — one for the backend, one for the frontend.

### 1. Backend (terminal #1)

```bash
cd backend
npm install
copy .env.example .env      # Windows PowerShell / CMD
# cp .env.example .env       # macOS / Linux
npm run dev
```

- The server starts on `http://localhost:4000`.
- On startup it **creates the SQLite database and the `users` table automatically**
  at `backend/data/study-sync.sqlite` — no separate migration step needed.
- Verify it works: open `http://localhost:4000/health`, you should see:

  ```json
  { "status": "ok", "app": "Study Sync" }
  ```

### 2. Frontend (terminal #2)

```bash
cd frontend
npm install
npm run dev
```

- The app starts on `http://localhost:5173`.
- Open it in the browser, click **"Check backend connection"**, and you should
  see the `/health` response rendered on the page.
- (Optional) `copy .env.example .env` if you want to point at a different backend URL.

## Backend scripts

| Command         | Description                                      |
| --------------- | ------------------------------------------------ |
| `npm run dev`   | Run with `tsx` + watch mode (auto-reload).       |
| `npm run build` | Compile TypeScript to `dist/`.                   |
| `npm start`     | Run the compiled output (`dist/index.js`).       |

## Frontend scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the Vite dev server.           |
| `npm run build`   | Type-check and build for production. |
| `npm run preview` | Preview the production build.        |

## Notes

- `.env` files and the `data/` SQLite files are git-ignored. Only `.env.example`
  is committed.
- This is **stage 1 (skeleton)**. Auth, tasks/study-sessions, comments, filters
  and stats will be added in later stages.
