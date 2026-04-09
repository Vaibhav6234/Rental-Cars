import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'

const Register = ({ onLogin }) => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'buyer' })
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleRegister = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.password) {
      toast.error('All fields are required')
      return
    }
    try {
      setIsLoading(true)
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, form)
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      onLogin(data.user.role)
      toast.success('Registered successfully!')
      navigate('/')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">

        {/* Brand header */}
        <div className="bg-blue-950 px-8 py-7 text-center">
          {/* <span className="text-3xl">🚗</span> */}
          <h1 className="text-2xl font-bold text-white mt-1">Rental Cars</h1>
          <p className="text-blue-300 text-sm mt-1">Create your account to get started</p>
        </div>

        <div className="px-8 py-8 bg-white">
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-xl outline-none transition focus:border-blue-950 focus:ring-4 focus:ring-blue-100"
              />
            </div>
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">I want to</label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-xl outline-none transition focus:border-blue-950 focus:ring-4 focus:ring-blue-100 bg-white"
              >
                <option value="buyer">Rent a Car (Buyer)</option>
                <option value="seller">List my Car (Seller)</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-950 text-white py-3 rounded-xl font-semibold hover:bg-blue-900 transition disabled:opacity-70 mt-2"
            >
              {isLoading ? 'Registering...' : 'Create Account'}
            </button>
          </form>
          <p className="mt-5 text-center text-gray-500 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-950 font-semibold hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
