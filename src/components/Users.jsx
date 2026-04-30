import { useState, useMemo } from 'react'
import { Plus, Edit2, Trash2, X, User, Mail, Lock, Shield } from 'lucide-react'
import { useAuth, formatDate } from '../context/AuthContext'
import DataTable from './DataTable'

export default function Users() {
  const { users, addUser, updateUser, deleteUser, hasPermission, isAdmin } = useAuth()
  const [showModal, setShowModal] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
    status: 'active'
  })
  const [errors, setErrors] = useState({})

  const canEdit = hasPermission('edit_users')
  const canDelete = hasPermission('delete_users')

  const columns = useMemo(() => [
    {
      key: 'name',
      label: 'User',
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <img 
            src={row.avatar} 
            alt={value}
            className="w-10 h-10 rounded-full bg-gray-100"
          />
          <div>
            <p className="font-medium text-gray-900">{value}</p>
            <p className="text-xs text-gray-500">ID: #{row.id}</p>
          </div>
        </div>
      )
    },
    {
      key: 'email',
      label: 'Email',
    },
    {
      key: 'role',
      label: 'Role',
      render: (value) => (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          value === 'admin' 
            ? 'bg-purple-100 text-purple-700' 
            : 'bg-blue-100 text-blue-700'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          value === 'active' 
            ? 'bg-green-100 text-green-700' 
            : 'bg-red-100 text-red-700'
        }`}>
          {value}
        </span>
      )
    },
{
      key: 'createdAt',
      label: 'Joined',
      render: (value) => formatDate(value)
    },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      render: (_, row) => (
        <div className="flex items-center gap-2">
          {canEdit && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleEdit(row)
              }}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Edit2 size={16} className="text-gray-600" />
            </button>
          )}
          {canDelete && row.role !== 'admin' && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleDelete(row.id)
              }}
              className="p-2 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 size={16} className="text-red-600" />
            </button>
          )}
        </div>
      )
    }
  ], [canEdit, canDelete])

  const handleEdit = (user) => {
    setEditingUser(user)
    setFormData({
      name: user.name,
      email: user.email,
      password: '',
      role: user.role,
      status: user.status
    })
    setShowModal(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(id)
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }
    if (!editingUser && !formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateForm()) return

    if (editingUser) {
      const updateData = {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        status: formData.status
      }
      if (formData.password) {
        updateData.password = formData.password
      }
      updateUser(editingUser.id, updateData)
    } else {
      addUser(formData)
    }

    setShowModal(false)
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'user',
      status: 'active'
    })
    setEditingUser(null)
    setErrors({})
  }

  const handleClose = () => {
    setShowModal(false)
    resetForm()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-500 mt-1">Manage user accounts and permissions</p>
        </div>
        {canEdit && (
          <button
            onClick={() => {
              resetForm()
              setShowModal(true)
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
          >
            <Plus size={20} />
            Add User
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <p className="text-sm text-gray-500">Total Users</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{users.length}</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <p className="text-sm text-gray-500">Active Users</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {users.filter(u => u.status === 'active').length}
          </p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <p className="text-sm text-gray-500">Admins</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {users.filter(u => u.role === 'admin').length}
          </p>
        </div>
      </div>

      {/* Users Table */}
      <DataTable
        data={users}
        columns={columns}
        searchable={true}
        sortable={true}
        pagination={true}
        pageSize={10}
      />

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={handleClose}
          />
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-2xl w-full max-w-md mx-4 animate-fadeIn">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingUser ? 'Edit User' : 'Add New User'}
              </h2>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full pl-12 pr-4 py-3 border rounded-xl outline-none transition-colors ${
                      errors.name ? 'border-red-500' : 'border-gray-200 focus:border-primary-500'
                    }`}
                    placeholder="Enter full name"
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full pl-12 pr-4 py-3 border rounded-xl outline-none transition-colors ${
                      errors.email ? 'border-red-500' : 'border-gray-200 focus:border-primary-500'
                    }`}
                    placeholder="Enter email address"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Password {editingUser && '(leave blank to keep current)'}
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className={`w-full pl-12 pr-4 py-3 border rounded-xl outline-none transition-colors ${
                      errors.password ? 'border-red-500' : 'border-gray-200 focus:border-primary-500'
                    }`}
                    placeholder="Enter password"
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              {/* Role & Status */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Role
                  </label>
                  <div className="relative">
                    <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl outline-none transition-colors focus:border-primary-500"
                    >
                      <option value="user">User</option>
                      {isAdmin && <option value="admin">Admin</option>}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none transition-colors focus:border-primary-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
                >
                  {editingUser ? 'Update User' : 'Add User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
