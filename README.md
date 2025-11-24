# ShipHero Packing System

A product packing system built with **Next.js 15** (App Router), **TypeScript**, **Apollo Client**, and **Styled Components**.

---

## Core Features

- [x] Split view: unpacked items (left) / packed items (right)
- [x] Create and remove packages
- [x] Pack items by clicking
- [x] Pack items via barcode scan
- [x] Modify packed quantities (add/remove)
- [x] Ship button when all items packed
- [x] Submit packages via GraphQL mutation

---

## Extra Features

- Dark/Light theme with persistence
- Clean, modern UI design
- Tooltips and toast notifications
- Pack one item or entire stock at once
- Always displays at least one empty package
- Confirmation modals for critical actions
- Barcode input validation
- **86.7% test coverage**
- Strong TypeScript throughout
- Well-organized component architecture

---

## Commands

```bash
# Install dependencies
yarn install

# Run both API and frontend
yarn dev

# Run only the API (from ./apps/api)
yarn dev

# Run only the frontend (from ./apps/frontend)
yarn dev

# Build for production (from ./apps/frontend)
yarn build

# Run tests with coverage
yarn test

# Run ESLint
yarn lint
```

---

## Future Improvements

| Area              | Recommendation                                                                  |
| ----------------- | ------------------------------------------------------------------------------- |
| **Styling**       | Replace Styled Components with Tailwind CSS for better SSR performance          |
| **Data Fetching** | Add React Query for caching and optimized SSR                                   |
| **Responsive**    | Add tablet and mobile layouts                                                   |
| **Backend**       | Store packages in database via GraphQL schema                                   |
| **State**         | Use Zustand or Jotai to reduce re-renders (React Context can be heavy at scale) |
| **Search**        | Add product search/filters with MeiliSearch                                     |

---

## Tech Stack

- Next.js 15 (App Router)
- React 19
- TypeScript 5.9
- Apollo Client 3
- Styled Components 6
- Jest + React Testing Library

---

Thanks for reviewing this project!

_Franco Amoroso_

[Franco Amoroso](https://www.linkedin.com/in/francoamoroso/)

[Web Portfolio](https://www.franamoroso.com/)
