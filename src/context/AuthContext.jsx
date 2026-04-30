import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

// Helper function to format date
export function formatDate(dateString) {
  if (!dateString) return ''
  // Parse date as local time to avoid timezone issues
  const [year, month, day] = dateString.split('-')
  const date = new Date(year, month - 1, day)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}

// Mock users data
const MOCK_USERS = [
  { id: 1, name: 'Admin User', email: 'admin@example.com', password: 'admin123', role: 'admin', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin', status: 'active', createdAt: '2024-01-15' },
  { id: 2, name: 'John Doe', email: 'john@example.com', password: 'user123', role: 'user', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John', status: 'active', createdAt: '2024-02-20' },
  { id: 3, name: 'Sarah Smith', email: 'sarah@example.com', password: 'user123', role: 'user', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', status: 'active', createdAt: '2024-03-10' },
  { id: 4, name: 'Mike Johnson', email: 'mike@example.com', password: 'user123', role: 'user', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike', status: 'inactive', createdAt: '2024-03-15' },
  { id: 5, name: 'Emily Brown', email: 'emily@example.com', password: 'user123', role: 'admin', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily', status: 'active', createdAt: '2024-04-01' },
]

// Load users from localStorage or use default
function loadUsers() {
  const saved = localStorage.getItem('dashboard_users')
  if (saved) {
    return JSON.parse(saved)
  }
  return MOCK_USERS
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState(loadUsers)
  const [loading, setLoading] = useState(true)

  // Save users to localStorage when they change
  useEffect(() => {
    localStorage.setItem('dashboard_users', JSON.stringify(users))
  }, [users])

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('dashboard_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = (email, password) => {
    const foundUser = users.find(u => u.email === email && u.password === password)
    if (foundUser) {
      setUser(foundUser)
      localStorage.setItem('dashboard_user', JSON.stringify(foundUser))
      return { success: true, user: foundUser }
    }
    return { success: false, error: 'Invalid email or password' }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('dashboard_user')
  }

  const hasPermission = (permission) => {
    if (!user) return false
    if (user.role === 'admin') return true
    
    const userPermissions = {
      user: ['view_dashboard', 'view_users'],
      admin: ['view_dashboard', 'view_users', 'edit_users', 'delete_users', 'manage_permissions']
    }
    
    return userPermissions[user.role]?.includes(permission) || false
  }

  const addUser = (userData) => {
    const newUser = {
      ...userData,
      id: Math.max(...users.map(u => u.id)) + 1,
      createdAt: new Date().toISOString().split('T')[0],
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.name}`
    }
    setUsers([...users, newUser])
    return newUser
  }

  const updateUser = (id, userData) => {
    setUsers(users.map(u => u.id === id ? { ...u, ...userData } : u))
  }

  const deleteUser = (id) => {
    setUsers(users.filter(u => u.id !== id))
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      users, 
      loading, 
      login, 
      logout, 
      hasPermission,
      addUser,
      updateUser,
      deleteUser,
      isAdmin: user?.role === 'admin'
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
