<div align="center">

# 📦 Packing System

### A modern warehouse packing solution built for speed and efficiency

<br />

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)
![Testing](https://img.shields.io/badge/Coverage-86.7%25-success?style=for-the-badge)

<br />

[Features](#-features) · [Quick Start](#-quick-start) · [Architecture](#-architecture) · [Testing](#-testing) · [Roadmap](#-roadmap)

</div>

<br />

---

<br />

## About

This project is a **Frontend Developer Challenge** submission. It demonstrates proficiency in modern React development, state management, API integration, and UI/UX design principles.

The application simulates a warehouse packing workflow where operators can efficiently pack products into packages using click interactions or barcode scanning.

<br />

## ✨ Features

### Core Functionality

| Feature                  | Description                                              |
| ------------------------ | -------------------------------------------------------- |
| **Split View Interface** | Unpacked items on the left, packed packages on the right |
| **Package Management**   | Create, modify, and remove packages dynamically          |
| **Click-to-Pack**        | Intuitive one-click packing experience                   |
| **Barcode Scanner**      | Real-time barcode input with validation                  |
| **Quantity Control**     | Granular control over packed item quantities             |
| **Ship & Submit**        | GraphQL mutation to finalize and ship packages           |

### Extra Mile

| Feature                 | Why It Matters                               |
| ----------------------- | -------------------------------------------- |
| **Dark/Light Theme**    | Persisted preference with `next-themes`      |
| **Toast Notifications** | User feedback notifications                  |
| **Confirmation Modals** | Prevents accidental actions                  |
| **Bulk Actions**        | Pack entire stock with one click             |
| **Empty Package State** | Always shows at least one package ready      |
| **Type Safety**         | Strict TypeScript across the entire codebase |

<br />

## 🛠 Tech Stack

```
Frontend        Next.js 15 · React 19 · TypeScript · Styled Components
State           React Context + Custom Hooks
Data Layer      Apollo Client · GraphQL
UI Components   MUI · Lucide Icons · Base UI
Forms           React Hook Form · Zod validation
Testing         Jest · React Testing Library
```

<br />

## 🚀 Quick Start

```bash
# 1. Install dependencies
yarn install

# 2. Start development (API + Frontend)
yarn dev

# App runs at http://localhost:3000
```

### Available Scripts

| Command      | Description                                     |
| ------------ | ----------------------------------------------- |
| `yarn dev`   | Start both API and frontend in development mode |
| `yarn build` | Create production build                         |
| `yarn test`  | Run test suite with coverage report             |
| `yarn lint`  | Run ESLint across the codebase                  |

<br />

## 📐 Architecture

```
apps/
├── api/                 # GraphQL API server
└── frontend/
    └── src/
        ├── app/         # Next.js App Router pages
        ├── assets/      # Static assets
        ├── components/  # Reusable UI components
        ├── contexts/    # React Context providers
        ├── hooks/       # Custom hooks
        ├── lib/         # Apollo client & utilities
        ├── types/       # TypeScript definitions
        └── utils/       # Helper functions
```

<br />

## 🧪 Testing

The project maintains **86.7% test coverage** with a focus on:

- Component rendering and interactions
- User workflows (pack, unpack, ship)
- Edge cases and error states

```bash
yarn test
```

<br />

## 🗺 Recommended Improvements

| Priority | Enhancement                 | Rationale                                           |
| -------- | --------------------------- | --------------------------------------------------- |
| High     | **Tailwind CSS Migration**  | Better SSR performance, smaller bundle              |
| High     | **React Query Integration** | Caching, optimistic updates, stale-while-revalidate |
| Medium   | **Responsive Design**       | Tablet and mobile support                           |
| Medium   | **Zustand for State**       | Reduce re-renders at scale                          |
| Low      | **Product Search**          | MeiliSearch integration for large catalogs          |
| Low      | **Database Persistence**    | Store packages via GraphQL schema                   |

<br />

---

<br />

<div align="center">

### Built by Franco Amoroso

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/francoamoroso/)
[![Portfolio](https://img.shields.io/badge/Portfolio-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://www.franamoroso.com/)

<br />

_Thank you for taking the time to review this project!_

</div>
