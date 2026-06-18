# React + TailwindCSS Template

A standardized, scalable starter template for React applications.

## Stack

| Tool | Version | Purpose |
|------|---------|---------|
| [Vite](https://vitejs.dev/) | 8 | Build tool & dev server |
| [React](https://react.dev/) | 19 | UI framework |
| [TypeScript](https://www.typescriptlang.org/) | 5.6 | Type safety |
| [TailwindCSS](https://tailwindcss.com/) | 4 | Utility-first styling |
| [React Router](https://reactrouter.com/) | 7 | Client-side routing |
| [ESLint](https://eslint.org/) | 9 | Linting |
| [Prettier](https://prettier.io/) | 3 | Code formatting |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 20+
- npm 10+

### Install

```bash
npm install
```

### Environment

Copy the example env file and fill in any values:

```bash
cp .env.example .env
```

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Base URL for all API requests (e.g. `https://api.example.com`) |

### Run

```bash
npm run dev
```

Opens at `http://localhost:5173`.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Type-check and build for production (`dist/`) |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Lint all TypeScript files |
| `npm run format` | Format all files under `src/` with Prettier |

---

## Project Structure

```
src/
├── components/
│   └── ui/             # Reusable UI primitives (Button, etc.)
├── hooks/              # Custom React hooks
├── layouts/            # Page layout wrappers
├── pages/              # Route-level page components
├── services/
│   └── api.ts          # Typed fetch client
├── types/
│   └── index.ts        # Shared TypeScript types
├── utils/
│   └── cn.ts           # Class-name utility
├── App.tsx             # Route definitions
├── index.css           # Tailwind entry point
└── main.tsx            # App entry point
```

### Path Alias

`@/` maps to `src/`. Use it for all intra-src imports:

```ts
import Button from '@/components/ui/Button'
import { api } from '@/services/api'
```

---

## Adding Pages

1. Create a component in `src/pages/`.
2. Add a `<Route>` in `src/App.tsx`.

```tsx
// src/App.tsx
<Route path="/about" element={<AboutPage />} />
```

All routes automatically inherit the shared header/footer from `RootLayout`.

---

## Styling

TailwindCSS v4 is configured via CSS only — there is no `tailwind.config.js`. Custom design tokens go in `src/index.css` using `@theme`:

```css
@import 'tailwindcss';

@theme {
  --color-brand: #3b82f6;
  --font-sans: 'Inter', sans-serif;
}
```

Use the `cn()` utility to merge conditional class strings:

```ts
import { cn } from '@/utils/cn'

cn('base-class', isActive && 'active-class', className)
```

---

## API Calls

Use the typed fetch client in `src/services/api.ts`. It reads `VITE_API_URL` from `.env` as the base URL.

```ts
import { api } from '@/services/api'
import type { ApiResponse } from '@/types'

const data = await api.get<ApiResponse<User>>('/users/1')
await api.post('/users', { name: 'Alice' })
```

---

## Recommended VS Code Extensions

Install the recommended extensions when prompted, or find them in [.vscode/extensions.json](.vscode/extensions.json):

- **Tailwind CSS IntelliSense** — class autocomplete & linting
- **Prettier** — format on save
- **ESLint** — inline lint errors
