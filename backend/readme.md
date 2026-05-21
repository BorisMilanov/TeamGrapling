.NET Web Application — Auth & Admin Panel
A production-ready ASP.NET Core web application with user authentication (login/register) and a full-featured admin panel.

Stack
Layer	Technology
Framework	ASP.NET Core 8.0 (LTS)
ORM	Entity Framework Core 8
Auth	ASP.NET Core Identity
Database	SQL Server / SQLite (dev)
UI	React and react router and Ant desing
Admin Panel	Custom Razor Area
Features
Authentication
User registration with email confirmation
Secure login with remember-me option
Password hashing (ASP.NET Core Identity default: PBKDF2)
Logout and session management
Password reset via email token
Admin Panel (/admin)
Role-based access — only users with Admin role can enter
User management — view, edit, delete, ban/unban users
Role management — assign/revoke roles per user
Dashboard — active users, registrations, system stats
Audit log — tracks admin actions with timestamp + actor
Full CRUD over application entities
Responsive sidebar layout
MyApp/
├── Areas/
│   └── Admin/
│       ├── Controllers/
│       │   ├── DashboardController.cs
│       │   ├── UsersController.cs
│       │   └── RolesController.cs
│       └── Views/
│           ├── Dashboard/
│           ├── Users/
│           └── Roles/
├── Controllers/
│   └── AccountController.cs       # Login, Register, Logout
├── Models/
│   ├── ApplicationUser.cs         # Extended IdentityUser
│   └── AuditLog.cs
├── Data/
│   └── ApplicationDbContext.cs
├── Views/
│   └── Account/
│       ├── Login.cshtml
│       └── Register.cshtml
├── wwwroot/
├── Program.cs
└── appsettings.json