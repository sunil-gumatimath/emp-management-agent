# Employee Management Dashboard

## Overview
This project is an employee operations dashboard built with React and Vite. It provides a consolidated view of workforce metrics, a searchable employee table, and inline tools for creating, editing, or removing team members. The experience is fully client-side: employee records persist in `localStorage`, so no backend is required for day-to-day use.

## Key Features
- **Interactive metrics header** summarizing totals, active headcount, on-leave teammates, and probationary hires.
- **Sidebar navigation and quick actions** for jumping between dashboard and directory sections, plus an always-available "Add Employee" shortcut.
- **Searchable employee directory** with department/status badges, inline edit/delete actions, and responsive table layout.
- **Modal-driven create/update flows** powered by `EmployeeForm.jsx`, including required field validation and graceful error messaging.
- **Persistent data layer** that hydrates from bundled seed data and stores changes in browser `localStorage` under the `employees` key.
- **Error resilience** via a reusable `ErrorBoundary` used around high-impact UI regions and forms.

## Tech Stack
- **React 18** with hooks (`useState`, `useEffect`, `useCallback`) and an application-level error boundary.
- **Vite** development tooling with a custom dev server port (`8080`) and optimized production build configuration.
- **Tailwind CSS** utility classes alongside scoped component styles in `src/App.css`.
- **Inter variable font** (`@fontsource-variable/inter`) for typography consistency.
- **npm or Bun** workflows, with both lockfiles committed for flexibility.

## Quick Start
### Prerequisites
- Node.js ≥ 18.0.0 *or* Bun ≥ 1.0.0.

### Install Dependencies
```bash
# Using npm
npm install

# Using Bun
bun install
```

### Run the Development Server
```bash
npm run dev
# or
bun run dev
```
The Vite dev server listens on `http://localhost:8080` (configurable in `vite.config.js`).

### Build & Preview Production Output
```bash
npm run build
npm run preview
# or with Bun
bun run build
bun run preview
```
`npm run preview` (or `bun run preview`) serves the production bundle for smoke testing.

### Lint the Workspace
```bash
npm run lint
# or
bun run lint
```

## Project Structure
```
src/
  App.jsx               // App shell: sidebar, metrics header, dashboards, modals
  App.css               // Extended design tokens and fallback styles
  assets/               // Static assets consumed in the UI
  components/
    common/
      Button.jsx        // Shared button primitive with variants
      Input.jsx         // Labeled text input with validation state
      Modal.jsx         // Accessible dialog with escape/overlay handling
      Select.jsx        // Styled select control
    employees/
      EmployeeForm.jsx  // Controlled form used for add/edit flows
      EmployeeList.jsx  // Searchable table with inline actions and badges
  index.css             // Tailwind layer definitions and global resets
  main.jsx              // React root bootstrapper
```

## Data & State Management
- Seed data in `App.jsx` populates the dashboard on first load; subsequent changes persist via `localStorage.setItem('employees', ...)`.
- Derived metrics (active, on-leave, probation counts) are computed from the current employee array each render.
- Search filtering is performed client-side across all employee fields for quick lookup.
- Error messages surface above the directory when validation or persistence issues occur.

## Accessibility & UX Notes
- Modal focus is trapped implicitly by closing on escape and via backdrop click, with `document.body` scroll locking while open.
- Buttons, links, and table rows include hover/focus states through Tailwind utilities for keyboard navigation.
- The error boundary ensures unexpected issues render a recoverable message rather than blank UI.

## Local Development Tips
- To reset the dataset, clear the `employees` key from your browser's Local Storage while the app is closed.
- Update navigation labels, metric copy, or seed data directly in `src/App.jsx` when tailoring for your organization.
- When integrating with a backend, replace the `localStorage` persistence methods with asynchronous calls in the add/edit/delete handlers.

## License
This project inherits the repository's default license. Update this section if distributing under explicit terms.
