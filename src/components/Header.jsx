import { useState } from 'react'
import { Menu, Search, Bell, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Header({ onMenuClick }) {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6">
      {/* Left side */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
        >
          <Menu size={24} className="text-gray-600" />
        </button>

        {/* Search */}
        <div className="hidden md:flex items-center gap-2 bg-gray-50 px-4 py-2.5 rounded-xl w-80">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <button className="relative p-2.5 hover:bg-gray-100 rounded-xl transition-colors">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User avatar */}
        <div className="flex items-center gap-3 pl-2">
          <div className="hidden sm:block text-right">
            <p className="font-medium text-gray-900 text-sm">{user?.name}</p>
            <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full rounded-xl" />
            ) : (
              <User size={20} className="text-primary-600" />
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
