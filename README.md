# 🎯 Professional Admin Dashboard

A modern, professional admin dashboard built with React, Tailwind CSS, and Recharts. Features comprehensive user management, analytics charts, and role-based permissions.

![React](https://img.shields.io/badge/React-18.2-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.3-cyan)
![Recharts](https://img.shields.io/badge/Recharts-2.10-orange)

## 🌐 Live Demo

🚀 **[Click Here for Live Demo](https://mohamedashraf71.github.io/Admin-Dashboard)**

> **Simply click the link above and the dashboard will open instantly!**

## ⚡ Quick Access

**Direct Links:**
- Dashboard: `https://mohamedashraf71.github.io/Admin-Dashboard`
- Login as Admin: `admin@example.com` / `admin123`
- Login as User: `john@example.com` / `user123`

## ✨ Features

### 📊 Dashboard & Analytics
- Revenue Overview (Area Chart)
- Daily Active Users (Bar Chart)
- Weekly Sales (Line Chart)
- Device Usage (Pie Chart)
- Key Metrics Cards with trends

### 👥 User Management (CRUD)
- Add new users
- Edit existing users
- Delete users
- User roles (Admin/User)
- User status management

### 📋 Advanced Data Table
- **Pagination** - Navigate through data
- **Search** - Filter results instantly
- **Sorting** - Sort by any column

### 🔐 Permissions System
- **Admin**: Full access (view, edit, delete, manage)
- **User**: View only access
- Role-based route protection

## 🛠️ Tech Stack

- **React 18** - UI Framework
- **Tailwind CSS** - Styling
- **Recharts** - Charts & Analytics
- **Vite** - Build Tool
- **React Router** - Navigation

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/mohamedashraf71/Admin-Dashboard.git

# Navigate to project
cd Admin-Dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🔑 Login Credentials

| Role | Email | Password |
|------|-------|----------|
| **Admin** | admin@example.com | admin123 |
| **User** | john@example.com | user123 |

## 📁 Project Structure

```
Admin-Dashboard/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx    # Main dashboard with charts
│   │   ├── DataTable.jsx   # Reusable table component
│   │   ├── Header.jsx     # Top navigation
│   │   ├── Login.jsx      # Login page
│   │   ├── Sidebar.jsx    # Side navigation
│   │   └── Users.jsx     # User management
│   ├── context/
│   │   └── AuthContext.jsx # Authentication & permissions
│   ├── App.jsx           # Main app component
│   ├── index.css         # Tailwind styles
│   └── main.jsx         # Entry point
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 📸 Screenshots

### Dashboard
- Beautiful analytics charts
- Revenue, Users, Orders, and Page Views metrics
- Interactive chart controls

### Users Management
- Clean data table with search & pagination
- Add/Edit user modals
- Role-based action buttons

## 📝 License

MIT License - Feel free to use this project for any purpose.

---

Made with ❤️ by [Mohamed Ashraf](https://github.com/mohamedashraf71)
