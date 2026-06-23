<div align="center">

# 📦 Packing Challenge v2

<br />

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)

<br />

[Features](#-features) · [What's New](#-whats-new-in-v2) · [Quick Start](#-quick-start) · [Testing](#-testing)

</div>

<br />

---

<br />

The application simulates a warehouse packing workflow where operators can efficiently pack products into packages using click interactions or barcode scanning.

<br />

## ✨ Features

### Core Functionality

| Feature                | Description                                     |
| ---------------------- | ----------------------------------------------- |
| **Package Management** | Create, modify, and remove packages dynamically |
| **Click-to-Pack**      | Intuitive one-click packing experience          |
| **Barcode Scanner**    | Real-time barcode input with validation         |
| **Quantity Control**   | Granular control over packed item quantities    |

### Extra Mile

| Feature                 | Why It Matters                          |
| ----------------------- | --------------------------------------- |
| **Dark/Light Theme**    | Persisted preference with `next-themes` |
| **Toast Notifications** | User feedback notifications             |
| **Confirmation Modals** | Prevents accidental actions             |
| **Bulk Actions**        | Pack entire stock with one click        |
| **Empty Package State** | Always shows at least one package ready |

<br />

## 🆕 What's New in v2?

A senior-lens rework of the original solution — the theme is _removing_ layers, not adding them.

| Area               | Change                                                                                              |
| ------------------ | --------------------------------------------------------------------------------------------------- |
| **Dependencies**   | 15 → 7 runtime deps — native UI instead of MUI/Emotion/base-ui/lucide/RHF/zod (bundle 164 → 139 kB) |
| **State**          | Atomic updates in a pure reducer — `lineItems` + `packages` move in a single dispatch               |
| **Domain + scale** | Barcode lookup moved to a Server Action + multi-location inventory; fixed an SKU-uniqueness bug     |
| **Performance**    | Removed `useCallback`/`useMemo` that saved no re-renders, they were just noise                      |
| **Architecture**   | Flattened to one file per component (156 → 76 files)                                                |
| **Quality**        | Fixed an impure `setState` updater (StrictMode-safe); behavior-focused tests                        |

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

## 🧪 Testing

Unit + integration tests (Jest · React Testing Library) keep **~86% coverage**, focused on:

- Business logic — stock/package transforms and the pure reducer
- Orchestration — context actions and the shipping flow
- Component logic where it matters — barcode lookup, edge cases and error states

```bash
yarn test
```

### End-to-end

The E2E suite it's a reproducible playbook meant to be **driven by an AI agent locally**. Install the [Playwright CLI](https://playwright.dev) (or the Playwright MCP server) and run the scenarios in [`apps/frontend/src/qa/E2E.md`](apps/frontend/src/qa/E2E.md) with an agent against a running app (`yarn dev`): it walks the full pack → ship → reset flow plus the barcode Server Action lookup.

<br />

---

<br />

<div align="center">

### Built by Franco Gabriel Amoroso

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/francoamoroso/)
[![Portfolio](https://img.shields.io/badge/Portfolio-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://www.franamoroso.com/)

<br />

_Thank you for taking the time to review this project!_

</div>
