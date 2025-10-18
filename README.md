# Employee Management Dashboard

## Overview
This project is a modern employee management dashboard built with React and Vite. It provides an at-a-glance view of workforce statistics, a searchable employee directory, and inline tools for adding, editing, or removing team members. Employee data is persisted in `localStorage`, making the app fully functional without a backend.

## Features
- **Navigation sidebar** with quick links and actions
- **Header insights** summarizing total, active, on-leave, and probation counts
- **Dashboard cards** highlighting key workforce metrics
- **Searchable employee directory** with sortable information cards
- **Add/Edit employee modals** with validation and accessible focus management
- **Local persistence** of employee data via browser `localStorage`

## Tech Stack
- **React 18** with hooks (`useState`, `useEffect`, `useCallback`)
- **Vite** for fast development and optimized builds
- **Tailwind CSS** utility classes for styling
- **Bun / npm** compatible scripts (project ships with both `package-lock.json` and `bun.lock`)

## Getting Started
### Prerequisites
- Node.js ≥ 18 (or Bun ≥ 1.0 if you prefer Bun tooling)

### Installation
```bash
# Using npm
npm install

# Using bun
bun install
```

### Development Server
```bash
npm run dev
# or
bun run dev
```
The app will be available at `http://localhost:5173` by default.

### Production Build
```bash
npm run build
npm run preview
# or with bun
bun run build
bun run preview
```

## Project Structure
```
src/
  App.jsx              # Main layout with sidebar, header, and dashboard sections
  App.css              # Global styles and design tokens
  components/
    common/            # Shared UI primitives (Button, Modal, Input, Select)
    employees/
      EmployeeList.jsx # Searchable employee directory
      EmployeeForm.jsx # Form used by add/edit modals
  assets/              # Static assets (logos, icons)
  main.jsx             # Application bootstrap
```

## Data & State
- Employee records are initialized with sample data and stored in `localStorage` under the `employees` key.
- Forms perform basic validation (name and valid email required) before persisting changes.
- Deletions prompt for confirmation to prevent accidental data loss.

## Customization
- Update header insight cards or sidebar navigation labels directly in `src/App.jsx`.
- Tailwind utility classes make it easy to adjust spacing, colors, and typography.
- To wire the app to a real API, replace the `localStorage` persistence logic in `App.jsx` with fetch calls to your backend.

## Scripts
- **`npm run lint`** – Run ESLint (if configured)
- **`npm run test`** – Placeholder for future tests (not currently defined)

## License
This project inherits the default license of your repository. Update this section if you intend to distribute the project under specific terms.
