
# RATA Dental Clinic – Frontend (Technical Overview)

Frontend mini application built for a dental clinic system using **React, GraphQL, and modern state management**.
This project focuses on frontend architecture, data flow, and UI behavior in a backend-less environment.


## Stack

* React 18 (Vite)
* Tailwind CSS
* Apollo Client (GraphQL)
* Zustand (Global State)
* React Router
* Apollo MockedProvider


## Implemented Features

* **Patient List**

  * GraphQL query
  * Client-side search (case-insensitive)
  * Debounced input
  * Pagination
  * Role-based UI (admin / staff)

* **Patient Detail**

  * GraphQL query
  * Patient profile + dummy visit history

* **Patient Form (Create / Edit)**

  * Reusable form component
  * Basic validation
  * GraphQL mutation flow implemented

* **Appointment Calendar**

  * Weekly calendar view
  * Appointment list fetched via GraphQL query

* **Workflow Builder**

  * Stateful workflow editor
  * Add / remove / reorder steps
  * Zustand used for persistence during session


## Architecture Decisions

### GraphQL & Data Handling

* GraphQL is used for:

  * Patient list & detail
  * Appointment list
  * Create/Edit patient (mutation flow)
* Backend is not provided; GraphQL responses are mocked.
* Data persistence across refresh is intentionally not implemented.
* UI behavior and data flow are designed to be backend-ready.

### State Management

* Zustand is used for:

  * Search & pagination state
  * User role (admin/staff)
  * Workflow builder state
* Apollo Client cache is treated as the single source of truth for GraphQL query data.

### Role-Based Access

* Admin: create/edit access
* Staff: read-only access
* Role switching is available via UI for demo purposes.


## Project Structure

```txt
src/
├─ pages/          # Feature pages (list, detail, calendar, workflow)
├─ components/     # Reusable UI components
├─ graphql/        # Queries & mutations (domain-based)
├─ store/          # Zustand stores
├─ mocks/          # GraphQL mock data
└─ router/         # Route configuration
```


## Notes for Reviewer

* The project intentionally avoids localStorage or fake persistence.
* Focus is placed on:

  * Clean component boundaries
  * Predictable data flow
  * Maintainable state management
* The application can be connected to a real backend with minimal changes.


## Run Locally

```bash
npm install
npm run dev
```


Thank you for reviewing this submission.

