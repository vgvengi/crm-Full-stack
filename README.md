# CRM Workspace — Full-Stack Sales CRM

A full-stack CRM inspired by HubSpot, built with **React 19, TypeScript, Express and MySQL**. It lets a sales user manage contacts and companies, view a deals pipeline whose stages come from the database, and sign up / log in with Argon2-hashed passwords.

> Independent learning project. Not affiliated with, endorsed by, or connected to HubSpot.

<!--
  ADD THESE AS SOON AS THEY EXIST — they matter more to a recruiter than anything below:
  **Live demo:** https://...   (demo login: demo@example.com / ...)
  ![Contacts page](docs/screenshots/contacts.png)
  ![Deals pipeline](docs/screenshots/deals.png)
-->

## Features

- **Contacts** — list contacts from MySQL, create new contacts, search and select rows in the table
- **Companies** — list companies from MySQL, create new companies
- **Deals pipeline** — pipeline columns, order and colours are read from a `deal_stages_array` table, so stages can change without a code change
- **Authentication** — signup and login API with passwords hashed using Argon2
- **Dashboard UI** — responsive layout with sidebar and top navigation, built with Tailwind CSS v4 and Radix UI primitives
- **Routing** — React Router v7 with a guarded dashboard area (see [Known limitations](#known-limitations))

## Tech Stack

| Area | Technologies |
| --- | --- |
| Frontend | React 19, TypeScript, Vite, Tailwind CSS v4, React Router v7 |
| UI | Radix UI, shadcn-style components, Lucide React, React Icons |
| Backend | Node.js, Express, TypeScript |
| Database | MySQL 8 with `mysql2` connection pool |
| Security | Argon2 password hashing |

## Technical Decisions

- **Argon2 for password hashing** — a memory-hard algorithm designed to resist GPU brute-force attacks; plain-text passwords are never stored.
- **Pipeline stages stored in the database** — stage name, position and colour live in a table instead of being hard-coded in the frontend, so the pipeline is configurable.
- **Connection pool** — `mysql2` pool with the limit set from `DB_CONNECTION_LIMIT`, so requests reuse connections instead of opening a new one each time.
- **Frontend / backend split** — separate `frontend/` and `backend/` apps so each can be deployed independently.

## Project Structure

```text
.
├── backend/                 # Express API + MySQL
│   ├── config/              # Database pool configuration
│   ├── middleware/          # Shared Express middleware
│   └── routes/              # Contacts, companies, deal stages, signup, login
├── frontend/                # React + Vite app
│   └── src/
│       ├── components/      # Shared UI and dashboard components
│       ├── layouts/         # App layouts
│       ├── pages/           # Contacts, companies, deals, auth, home
│       └── routes/          # Client-side routes
└── README.md
```

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/users` | Create a user account |
| `POST` | `/api/auth/login` | Verify user credentials |
| `GET` | `/api/contacts` | List contacts |
| `POST` | `/api/contacts` | Create a contact |
| `GET` | `/api/companies` | List companies |
| `POST` | `/api/companies` | Create a company |
| `GET` | `/api/dealsStages/deals-stage` | List pipeline stages |

## Getting Started

### Prerequisites

- Node.js 20+
- npm
- MySQL 8+

### 1. Clone the repository

```bash
git clone https://github.com/vgvengi/crm-Full-stack.git
cd crm-Full-stack
```

### 2. Set up the database

Create a database named `hubspot_crm` with these tables:

| Table | Columns |
| --- | --- |
| `users` | `user_name`, `user_email`, `password_hash` |
| `contacts` | fields submitted by the contact form |
| `companies` | fields submitted by the company form |
| `deal_stages_array` | `stages`, `stages_position`, `deal_stage_color` |

Then create `backend/.env`:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=hubspot_crm
DB_PORT=3306
DB_CONNECTION_LIMIT=10
PORT=5000
```

### 3. Run the backend

```bash
cd backend
npm install
npx tsx server.ts
```

API runs at `http://localhost:5000`.

### 4. Run the frontend

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Known Limitations

- **Auth is not enforced on the server yet.** The dashboard guard uses a `localStorage` flag on the client, and API routes do not check a session or token. This is the next thing being built.
- Deals are displayed but not yet created, edited or moved between stages.
- Contacts and companies support create and list only (no update or delete yet).
- No automated tests or deployment yet.

## Roadmap

1. Server-side authentication (JWT in an httpOnly cookie) with middleware protecting all CRM routes
2. Deal CRUD with drag-and-drop between pipeline stages
3. Update / delete for contacts and companies
4. `schema.sql` and seed data so the project runs with one command
5. Tests and deployment with a public demo

## Author

**Vengatesh VG** — Full-stack developer (React, TypeScript, Node.js, Express, MySQL)
GitHub: [@vgvengi](https://github.com/vgvengi)