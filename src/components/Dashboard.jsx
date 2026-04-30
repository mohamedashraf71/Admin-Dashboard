import { useState } from 'react'
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts'
import { TrendingUp, TrendingDown, Users, DollarSign, ShoppingCart, Eye } from 'lucide-react'
import { useAuth, formatDate } from '../context/AuthContext'

// Mock analytics data
const revenueData = [
  { name: 'Jan', revenue: 4000, profit: 2400 },
  { name: 'Feb', revenue: 3000, profit: 1398 },
  { name: 'Mar', revenue: 2000, profit: 9800 },
  { name: 'Apr', revenue: 2780, profit: 3908 },
  { name: 'May', revenue: 1890, profit: 4800 },
  { name: 'Jun', revenue: 2390, profit: 3800 },
  { name: 'Jul', revenue: 3490, profit: 4300 },
]

const usersData = [
  { name: 'Mon', users: 120 },
  { name: 'Tue', users: 180 },
  { name: 'Wed', users: 150 },
  { name: 'Thu', users: 220 },
  { name: 'Fri', users: 280 },
  { name: 'Sat', users: 190 },
  { name: 'Sun', users: 160 },
]

const salesData = [
  { name: 'Week 1', sales: 4000 },
  { name: 'Week 2', sales: 3000 },
  { name: 'Week 3', sales: 5000 },
  { name: 'Week 4', sales: 4500 },
]

const deviceData = [
  { name: 'Desktop', value: 60, color: '#3b82f6' },
  { name: 'Mobile', value: 30, color: '#10b981' },
  { name: 'Tablet', value: 10, color: '#f59e0b' },
]

const stats = [
  { 
    label: 'Total Revenue', 
    value: '$45,231', 
    change: '+12.5%', 
    trend: 'up',
    icon: DollarSign,
    color: 'bg-green-500'
  },
  { 
    label: 'Total Users', 
    value: '2,456', 
    change: '+8.2%', 
    trend: 'up',
    icon: Users,
    color: 'bg-blue-500'
  },
  { 
    label: 'Total Orders', 
    value: '1,234', 
    change: '+15.3%', 
    trend: 'up',
    icon: ShoppingCart,
    color: 'bg-purple-500'
  },
  { 
    label: 'Page Views', 
    value: '89,432', 
    change: '-2.4%', 
    trend: 'down',
    icon: Eye,
    color: 'bg-orange-500'
  },
]

const StatCard = ({ stat, index }) => {
  const Icon = stat.icon
  return (
    <div 
      className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow animate-fadeIn"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start justify-between">
        <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
          <Icon className="text-white" size={24} />
        </div>
        <div className={`flex items-center gap-1 text-sm font-medium ${
          stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
        }`}>
          {stat.trend === 'up' ? (
            <TrendingUp size={16} />
          ) : (
            <TrendingDown size={16} />
          )}
          {stat.change}
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-500">{stat.label}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const { users } = useAuth()
  const [activeChart, setActiveChart] = useState('revenue')

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={stat.label} stat={stat} index={index} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Revenue Overview</h3>
            <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5">
              <option>Last 7 months</option>
              <option>Last 30 days</option>
              <option>Last year</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#3b82f6" 
                fillOpacity={1} 
                fill="url(#colorRevenue)" 
              />
              <Area 
                type="monotone" 
                dataKey="profit" 
                stroke="#10b981" 
                fillOpacity={1} 
                fill="url(#colorProfit)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Users Chart */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Daily Active Users</h3>
            <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5">
              <option>This week</option>
              <option>Last week</option>
              <option>Last month</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={usersData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="users" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Second Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Weekly Sales</h3>
            <div className="flex gap-2">
              {['revenue', 'orders', 'users'].map(type => (
                <button
                  key={type}
                  onClick={() => setActiveChart(type)}
                  className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                    activeChart === type 
                      ? 'bg-primary-600 text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="sales" 
                stroke="#f59e0b" 
                strokeWidth={3}
                dot={{ fill: '#f59e0b', strokeWidth: 2 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Device Chart */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Device Usage</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={deviceData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {deviceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Users Table */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Users</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left text-xs font-semibold text-gray-600 uppercase pb-4">User</th>
                <th className="text-left text-xs font-semibold text-gray-600 uppercase pb-4">Email</th>
                <th className="text-left text-xs font-semibold text-gray-600 uppercase pb-4">Role</th>
                <th className="text-left text-xs font-semibold text-gray-600 uppercase pb-4">Status</th>
                <th className="text-left text-xs font-semibold text-gray-600 uppercase pb-4">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.slice(0, 5).map(user => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={user.avatar} 
                        alt={user.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <span className="font-medium text-gray-900">{user.name}</span>
                    </div>
                  </td>
                  <td className="py-4 text-gray-600">{user.email}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.role === 'admin' 
                        ? 'bg-purple-100 text-purple-700' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.status === 'active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {user.status}
                    </span>
                  </td>
<td className="py-4 text-gray-600">{formatDate(user.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
