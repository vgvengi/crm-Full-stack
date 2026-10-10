# HubSpot CRM Clone

A portfolio full-stack CRM application inspired by HubSpot. It provides a responsive sales workspace for managing contacts and companies, viewing a deals pipeline, and signing up or logging in to the application.

> This is an independent learning project and is not affiliated with, endorsed by, or connected to HubSpot.

## Highlights

- Responsive CRM dashboard with sidebar navigation and a top navigation bar
- Contact and company tables backed by a MySQL database
- Create-contact and create-company forms
- Contact search, selection, and client-side table interactions
- Deals pipeline view driven by database-configured deal stages
- Signup and login endpoints with Argon2 password hashing
- React client routing with protected dashboard routes
- Reusable UI components, tooltips, and custom hooks

## Tech Stack

| Area | Technologies |
| --- | --- |
| Frontend | React 19, TypeScript, Vite, Tailwind CSS v4, React Router v7 |
| UI | Radix UI, Lucide React, React Icons, shadcn-style components |
| Backend | Node.js, Express, TypeScript |
| Database | MySQL with `mysql2` |
| Authentication | Argon2 password hashing |

## Project Structure

```text
.
|-- backend/                 # Express API and MySQL integration
|   |-- config/              # Database pool configuration
|   |-- middleware/          # Shared Express middleware
|   `-- routes/              # Contacts, companies, deals, signup, and login APIs
|-- frontend/                # React + Vite application
|   `-- src/
|       |-- components/      # Shared UI and dashboard components
|       |-- layouts/         # Application layouts
|       |-- pages/           # Contacts, companies, deals, auth, and home pages
|       `-- routes/          # Client-side routes
`-- README.md
```

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/users` | Create a user account |
| `POST` | `/api/auth/login` | Validate user credentials |
| `GET` | `/api/contacts` | List contacts |
| `POST` | `/api/contacts` | Create a contact |
| `GET` | `/api/companies` | List companies |
| `POST` | `/api/companies` | Create a company |
| `GET` | `/api/dealsStages/deals-stage` | List pipeline stages |

## Getting Started

### Prerequisites

- Node.js 20 or later
- npm
- MySQL 8 or later

### 1. Clone the repository

```bash
git clone https://github.com/<your-github-username>/crm-Full-stack.git
cd crm-Full-stack
```

### 2. Configure the database

Create a `backend/.env` file:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=hubspot_crm
DB_PORT=3306
DB_CONNECTION_LIMIT=10
PORT=5000
```

Create the MySQL database and the tables expected by the current API:

- `users` with `user_name`, `user_email`, and `password_hash`
- `contacts` with the fields submitted from the contact form
- `companies` with the fields submitted from the company form
- `deal_stages_array` with `stages`, `stages_position`, and `deal_stage_color`

Database migrations and seed scripts are planned improvements.

### 3. Start the backend

```bash
cd backend
npm install
npx tsx server.ts
```

The API starts at `http://localhost:5000`.

### 4. Start the frontend

In another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed by Vite, typically `http://localhost:5173`.

## Current Status

The project is actively being developed. The following functionality is currently implemented:

- User signup and credential verification
- MySQL-backed contact and company creation/listing
- Deals pipeline-stage retrieval
- CRM dashboard and core screens

### Planned Improvements

- Server-enforced authentication with sessions or tokens
- Persistent deal CRUD and drag/drop stage movement
- Contact/company update and delete APIs
- Complete bulk contact actions
- Database migrations and demo seed data
- Automated tests and continuous integration
- Production deployment configuration

## Important Notes

- Protected frontend routes currently use a client-side `localStorage` flag. They are a UI guard, not a replacement for server-side authorization.
- The application is intended as a portfolio and learning project. Do not use it to store real production customer data.

## Author

Built by **V. G. Vengi** as a full-stack React, TypeScript, Express, and MySQL portfolio project.
