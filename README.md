# Basera — Rental Management System (Frontend)

A React frontend for a Room Rental Management System, built with Vite. It covers
tenant and landlord flows: room search & listing, rent payment tracking,
maintenance requests, and document storage — matching the system described in
the accompanying project report.

> This package is **frontend only**. Data is currently persisted to the
> browser's `localStorage` via a small mock service layer
> (`src/services/api.js`), so the app is fully interactive without a server.
> Swap that file's functions for real `fetch` calls once a Node/Express +
> MySQL backend is available — every function already returns a Promise in
> the same shape a REST endpoint would.

## Tech stack

- React 18 + Vite
- React Router v6
- Plain CSS (no framework), using a shared design-token system in `src/index.css`

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Project structure

```
rental-management/
├── public/                 Static assets (favicon, etc.)
├── src/
│   ├── assets/              Images and icons
│   ├── components/
│   │   ├── Navbar/          Top navigation, role-aware
│   │   ├── Footer/          Site footer
│   │   ├── Sidebar/         Dashboard-side navigation (tenant/landlord)
│   │   ├── Cards/           RoomCard (signature "key-tag" card) & StatCard
│   │   ├── Buttons/         Shared Button component
│   │   ├── Forms/           FormField, Input, Select, Textarea
│   │   └── Common/          Badge, Loader, EmptyState
│   ├── pages/
│   │   ├── Home/            Marketing landing page + room search
│   │   ├── About/            Project background
│   │   ├── Contact/          Contact form
│   │   ├── Login/            Login (role selector: tenant/landlord)
│   │   ├── Register/         Signup (role selector)
│   │   ├── Dashboard/         Role-aware overview with stats
│   │   ├── Tenant/            Room search & apply
│   │   ├── Landlord/          Manage listed rooms, add new room
│   │   ├── Payments/          Rent payment + history
│   │   ├── Maintenance/       Submit/track maintenance requests
│   │   └── Profile/           Account details & document vault
│   ├── routes/                Route table + ProtectedRoute guard
│   ├── context/                AuthContext (demo session, localStorage-backed)
│   ├── services/                Mock API layer (rooms, payments, maintenance, docs)
│   ├── utils/                  formatCurrency, formatDate, etc.
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css               Design tokens + global styles
├── package.json
└── README.md
```

## Demo accounts

There's no real backend, so **any email + password** logs you in. Use the
role selector on the Login/Register page to try the Tenant or Landlord
experience — each has its own dashboard, sidebar, and permissions.

## Design notes

The visual system ("ledger & key") pairs a navy/brass palette with a
serif display face (Fraunces) and a monospace face (IBM Plex Mono) for
IDs, amounts, and dates — nodding to the record-keeping the system replaces.
The signature UI element is the **key-tag card** used for every room listing,
drawn with a die-cut hole like a physical keyring tag.

## Next steps for a full-stack build

- Replace `src/services/api.js` with real HTTP calls to a Node/Express API
- Add JWT-based auth in `AuthContext` instead of the localStorage demo session
- Wire file inputs (Profile, Maintenance) to real uploads (e.g. multipart form
  data to an `/uploads` endpoint, or S3-compatible storage)
- Add SMS/email notification triggers server-side per the original spec
