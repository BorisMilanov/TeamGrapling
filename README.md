# TeamGrapling — OSSU BJJ Academy

A full-stack web application for a Brazilian Jiu-Jitsu academy, featuring a public landing page, training schedule, and a planned admin panel.

---

## Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | React 19, TypeScript, Vite          |
| Routing    | React Router v7                     |
| UI Library | Ant Design 6, Lucide React          |
| Backend    | ASP.NET Core 8.0 (LTS)              |
| ORM        | Entity Framework Core 8             |
| Auth       | ASP.NET Core Identity               |
| Database   | SQL Server / SQLite (dev)           |

---

## Features

### Public Site
- Hero section with call-to-action (Bulgarian language)
- Benefits section with scroll-reveal animations
- Weekly training schedule table (clickable — navigates to full schedule)
- Contact / CTA section
- Responsive layout with mobile hamburger menu
- Footer with location, phone, and social links

### Authentication (Backend)
- User registration with email confirmation
- Secure login with remember-me option
- Password hashing via PBKDF2 (ASP.NET Core Identity)
- Logout and session management
- Password reset via email token

### Admin Panel (`/admin`) — Backend
- Role-based access (Admin role required)
- User management — view, edit, delete, ban/unban
- Role management — assign/revoke per user
- Dashboard — active users, registrations, system stats
- Audit log — tracks admin actions with timestamp and actor
- Full CRUD over application entities
- Responsive sidebar layout

---

## Project Structure

```
TeamGrapling/
├── frontend/                    # React + Vite SPA
│   ├── src/
│   │   ├── assets/              # Static images
│   │   ├── components/          # Shared UI components (AppHeader)
│   │   ├── layouts/             # Page layouts (MainLayout)
│   │   ├── pages/               # Route pages
│   │   │   ├── BJJHomePage.tsx  # Main landing page
│   │   │   ├── HeroSection.tsx
│   │   │   └── ScheduleTable.tsx
│   │   ├── App.tsx              # Router setup
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
│
└── backend/                     # ASP.NET Core API + Admin
    ├── Areas/
    │   └── Admin/
    │       ├── Controllers/
    │       │   ├── DashboardController.cs
    │       │   ├── UsersController.cs
    │       │   └── RolesController.cs
    │       └── Views/
    ├── Controllers/
    │   └── AccountController.cs
    ├── Models/
    │   ├── ApplicationUser.cs
    │   └── AuditLog.cs
    ├── Data/
    │   └── ApplicationDbContext.cs
    ├── Program.cs
    └── appsettings.json
```

---

## Routes

| Path       | Component         | Description              |
|------------|-------------------|--------------------------|
| `/`        | `BJJHomePage`     | Main landing page        |
| `/graphic` | `ScheduleTable`   | Full training schedule   |
| `/price`   | `Price`           | Pricing table (stub)     |
| `/about`   | `About`           | About the team (stub)    |

---

## Getting Started

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
dotnet restore
dotnet ef database update
dotnet run
```

---

## License

© 2026 OSSU BJJ Academy. All rights reserved.
