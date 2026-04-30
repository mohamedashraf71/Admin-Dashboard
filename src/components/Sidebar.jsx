import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Users, Settings, LogOut, ChevronLeft } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const menuItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard, permission: 'view_dashboard' },
  { path: '/users', label: 'Users', icon: Users, permission: 'view_users' },
  { path: '/settings', label: 'Settings', icon: Settings, permission: 'view_dashboard' },
]

export default function Sidebar({ isOpen, onClose }) {
  const { user, logout, hasPermission } = useAuth()

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 h-full bg-white border-l border-gray-200 
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
        w-64 flex flex-col
      `}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <div>
              <h1 className="font-bold text-gray-900">AdminHub</h1>
              <p className="text-xs text-gray-500">Dashboard</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <ChevronLeft size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {menuItems.filter(item => hasPermission(item.permission)).map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => window.innerWidth < 1024 && onClose()}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl font-medium
                transition-all duration-200
                ${isActive 
                  ? 'bg-primary-50 text-primary-600 nav-active' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
            >
              <item.icon size={20} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <img 
              src={user?.avatar} 
              alt={user?.name}
              className="w-10 h-10 rounded-full bg-gray-100"
            />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">{user?.name}</p>
              <p className="text-xs text-gray-500 truncate">{user?.role}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-xl font-medium transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  )
}
