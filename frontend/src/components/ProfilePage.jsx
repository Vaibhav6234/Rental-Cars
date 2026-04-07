import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const ProfilePage = ({ onLogin }) => {
  const [profile, setProfile] = useState(null)
  const [cars, setCars] = useState([])
  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '' })
  const [isSaving, setIsSaving] = useState(false)
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false)
  const fileInputRef = useRef()
  const navigate = useNavigate()

  const token = localStorage.getItem('token')

  const authHeader = { headers: { Authorization: `Bearer ${token}` } }

  useEffect(() => {
    if (!token) {
      navigate('/login')
      return
    }
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      setIsLoading(true)
      const { data } = await axios.get('http://localhost:3000/profile', authHeader)
      setProfile(data.user)
      setForm({ name: data.user.name, phone: data.user.phone || '' })
      if (data.user.role === 'seller') setCars(data.cars || [])
      else setBookings(data.bookings || [])
    } catch {
      toast.error('Failed to load profile')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    if (!form.name.trim()) {
      toast.error('Name cannot be empty')
      return
    }
    try {
      setIsSaving(true)
      const { data } = await axios.put('http://localhost:3000/profile', form, authHeader)
      setProfile(data.user)
      setIsEditing(false)
      const stored = JSON.parse(localStorage.getItem('user'))
      localStorage.setItem('user', JSON.stringify({ ...stored, name: data.user.name }))
      onLogin(data.user.role)
      toast.success('Profile updated!')
    } catch {
      toast.error('Failed to update profile')
    } finally {
      setIsSaving(false)
    }
  }

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      setIsUploadingAvatar(true)
      const formData = new FormData()
      formData.append('avatar', file)
      const { data } = await axios.put('http://localhost:3000/profile/avatar', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      setProfile(data.user)
      const stored = JSON.parse(localStorage.getItem('user'))
      localStorage.setItem('user', JSON.stringify({ ...stored, avatar: data.user.avatar }))
      onLogin(data.user.role)
      toast.success('Avatar updated!')
    } catch {
      toast.error('Failed to upload avatar')
    } finally {
      setIsUploadingAvatar(false)
    }
  }

  const getInitials = (name) => {
    if (!name) return '?'
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-gray-500">Loading profile...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="mx-auto max-w-4xl space-y-6">

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">

            {/* Avatar */}
            <div className="relative">
              {profile?.avatar ? (
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-blue-950"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-blue-950 text-white flex items-center justify-center text-3xl font-bold">
                  {getInitials(profile?.name)}
                </div>
              )}
              <button
                onClick={() => fileInputRef.current.click()}
                disabled={isUploadingAvatar}
                className="absolute bottom-0 right-0 bg-white border border-gray-300 rounded-full p-1 text-xs hover:bg-gray-50 cursor-pointer"
                title="Change avatar"
              >
                {isUploadingAvatar ? '...' : 'upload'}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>

            {/* Info */}
            <div className="flex-1 w-full">
              {isEditing ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Full Name"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                  <input
                    type="text"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="Phone Number"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="bg-blue-950 text-white px-5 py-2 rounded-lg hover:bg-blue-900 disabled:opacity-70"
                    >
                      {isSaving ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-2xl font-bold text-gray-900">{profile?.name}</h2>
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold capitalize ${profile?.role === 'seller' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                      {profile?.role}
                    </span>
                  </div>
                  <p className="text-gray-500">{profile?.email}</p>
                  {profile?.phone && <p className="text-gray-500 mt-1">{profile.phone}</p>}
                  <button
                    onClick={() => setIsEditing(true)}
                    className="mt-3 text-blue-950 underline text-sm cursor-pointer"
                  >
                    Edit Profile
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Seller: Posted Cars */}
        {profile?.role === 'seller' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-5">Your Posted Cars ({cars.length})</h3>
            {cars.length === 0 ? (
              <p className="text-gray-500">You haven't posted any cars yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cars.map((car) => (
                  <div key={car._id} className="flex gap-4 border border-gray-200 rounded-xl p-4">
                    <img src={car.image} alt={car.carName} className="w-24 h-20 object-cover rounded-lg" />
                    <div>
                      <p className="font-semibold text-gray-900">{car.carName}</p>
                      <p className="text-sm text-gray-500">{car.model} {car.fuelType}</p>
                      <p className="text-blue-950 font-bold mt-1">${car.pricePerDay}/day</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Buyer: Booking History */}
        {profile?.role === 'buyer' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-5">Your Bookings ({bookings.length})</h3>
            {bookings.length === 0 ? (
              <p className="text-gray-500">You haven't made any bookings yet.</p>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div key={booking._id} className="flex gap-4 border border-gray-200 rounded-xl p-4">
                    {booking.car?.image && (
                      <img src={booking.car.image} alt={booking.car.carName} className="w-24 h-20 object-cover rounded-lg" />
                    )}
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{booking.car?.carName || 'Car'}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(booking.from).toLocaleDateString()} â†’ {new Date(booking.to).toLocaleDateString()}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-blue-950 font-bold">${booking.totalPrice}</p>
                        <span className={`text-xs px-2 py-1 rounded-full font-semibold capitalize ${
                          booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                          booking.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  )
}

export default ProfilePage
