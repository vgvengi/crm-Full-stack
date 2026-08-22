# HubSpot Clone

A full-stack HubSpot CRM clone built with React, TypeScript, Tailwind CSS and Express/MySQL — featuring Contacts, Companies, and Deals modules with pipeline views, bulk actions, and a HubSpot-style dashboard UI.

## Overview

**HubSpot Clone** is a full-stack CRM web application that recreates the core UI/UX and workflows of HubSpot's CRM (Contacts, Companies, Deals, and Home dashboard), built as a learning/portfolio project with a React + TypeScript frontend and a Node.js/Express + MySQL backend.

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS v4, React Router v7, Radix UI (Tooltip), shadcn-style UI components, react-icons / lucide-react
- **Backend:** Node.js, Express, TypeScript, MySQL (via `mysql2`), CORS, dotenv
- **Architecture:** Monorepo with separate `frontend/` and `backend/` workspaces

## Key Features

- **Dashboard Shell** — HubSpot-style layout with a collapsible side nav, top bar (global search, quick-create, assistant shortcut), and routed content area
- **Home** — Personalized greeting, "prep for meetings" card, sales pipeline onboarding cards, and a task list widget
- **Contacts** — Sortable/filterable contact table backed by MySQL, tabbed views (All/My/Unassigned contacts), create-contact drawer with email validation, row selection with bulk **Assign / Edit / Delete** actions
- **Companies** — Company table with live data fetch, create-company form modal, and footer actions (Export, Clone, Refresh)
- **Deals** — Kanban/table view toggle, "All deals" / "My deals" tabs, deal property management (Edit Properties, Settings sidebar), restore deleted records, and calling settings page
- **Reusable UI Kit** — Custom hooks (`useClickOutSide`), shared Tooltip component, and consistent Tailwind-based styling across modules
- **REST API** — Express routes for `/api/contacts` and `/api/companies` with MySQL-backed create/read operations

## Project Structure

```
backend/     # Express + TypeScript API server (MySQL)
frontend/    # React + TypeScript + Vite client
```

## Getting Started

### Backend

```bash
cd backend
npm install
npm run dev
```

Configure a `.env` file with your MySQL connection details (`DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_PORT`, `PORT`).

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Status

Actively in development — a hands-on clone project focused on replicating real-world CRM UX patterns (data tables, modals, bulk actions, kanban boards) with a scalable full-stack architecture.
