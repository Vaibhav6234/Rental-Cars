import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'

const Login = ({ onLogin }) => {
  const [form, setForm] = useState({ email: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) {
      toast.error('Email and password are required')
      return
    }
    try {
      setIsLoading(true)
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, form)
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      onLogin(data.user.role)
      toast.success('Logged in successfully!')
      navigate('/')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">

        {/* Brand header */}
        <div className="bg-blue-950 px-5 md:px-8 py-6 text-center">
          {/* <span className="text-3xl">🚗</span> */}
          <h1 className="text-2xl font-bold text-white mt-1">Rental Cars</h1>
          <p className="text-blue-200 text-sm mt-1">Welcome back! Sign in to continue</p>
        </div>

        <div className="px-5 md:px-8 py-6 md:py-8 bg-white">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="email@xyz.com"
                value={form.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-xl outline-none transition focus:border-blue-950 focus:ring-4 focus:ring-blue-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-xl outline-none transition focus:border-blue-950 focus:ring-4 focus:ring-blue-100"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-950 text-white py-3 rounded-xl font-semibold hover:bg-blue-900 transition disabled:opacity-70 mt-2"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <p className="mt-5 text-center text-gray-500 text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-950 font-semibold hover:underline">Register</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
